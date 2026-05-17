import { projectHttp } from "@/api/http";
import { WEBSOCKET_ROUTES } from "@/api/routes.api";
import { signalRService } from "@/api/socket/signalr.service";
import { SOCKET_EVENTS } from "@/api/socket/socket-events";
import type { ProjectState } from "@/types/interfaces/project-state.interface";
import { create } from "zustand";

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectId: null,
  project: null,
  isConnected: false,

  setProject: async (projectId: string) => {
    const project = await projectHttp.getById(get().projectId as string)
    set({ projectId, project })
  },

  connectToProject: async (projectId: string) => {
    if(get().projectId === projectId && get().isConnected) return;

    try {
      const connection = signalRService.buildConnection("projects", WEBSOCKET_ROUTES.PROJECTS);

      if(connection.state === "Disconnected") {
        await signalRService.startConnection("projects")
      }

      const oldProjectID = get().projectId;
      if(oldProjectID && connection.state === "Connected") {
        await connection.invoke(SOCKET_EVENTS.PROJECTS.DISCONNECT, oldProjectID);
      }

      await connection.invoke(SOCKET_EVENTS.PROJECTS.CONNECT, projectId);
      set({ projectId, isConnected: true })
    } catch (error) {
      console.error("Failed to connect to project:", error);
      set({ isConnected: false })
    }

    try {
      if(!get().projectId) return;
      const project = await projectHttp.getById(get().projectId as string)
      set({ project })
    } catch (error) {
      console.error("Failed to get project:", error);
    }
  },
  disconnectFromProject: async () => {
    const { projectId, isConnected } = get();

    if(projectId && isConnected) {
      try {
        const connection = signalRService.getConnection("projects");
        if(connection && connection.state === "Connected") {
          await connection.invoke(SOCKET_EVENTS.PROJECTS.DISCONNECT, projectId);
        }
      } catch (error) {
        console.error("Failed to disconnect from project:", error);
      } finally {
        signalRService.stopConnection("projects");
      }
    }

    set({ projectId: null, project: null, isConnected: false })
  }
}))