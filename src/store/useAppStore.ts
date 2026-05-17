import { WEBSOCKET_ROUTES } from "@/api/routes.api";
import { signalRService } from "@/api/socket/signalr.service";
import { SOCKET_EVENTS } from "@/api/socket/socket-events";
import type { AppState } from "@/types/interfaces/app-state.interface";
import { create } from "zustand";

export const useAppStore = create<AppState>((set, get) => ({
  onlineUserIds: [],
  isConnected: false,

  connect: async () => {
    if (get().isConnected) return;

    try {
      const connection = signalRService.buildConnection("app", WEBSOCKET_ROUTES.APP);

      connection.off(SOCKET_EVENTS.USERS.CONNECT);
      connection.off(SOCKET_EVENTS.USERS.DISCONNECT);
      connection.on(SOCKET_EVENTS.USERS.CONNECT, (userId: string) => {
        console.log("[AppHub] UserConnected received:", userId);
        get().addOnlineUser(userId);
      });
      connection.on(SOCKET_EVENTS.USERS.DISCONNECT, (userId: string) => {
        console.log("[AppHub] UserDisconnected received:", userId);
        get().removeOnlineUser(userId);
      });

      if (connection.state === "Disconnected") {
        await signalRService.startConnection("app");
      }

      const users = await connection.invoke<string[]>(SOCKET_EVENTS.USERS.GET_ONLINE);
      console.log("[AppHub] GetOnlineUsers returned:", users);
      set({ onlineUserIds: users ?? [], isConnected: true });
    } catch (error) {
      console.error("AppHub: Failed to connect:", error);
      set({ isConnected: false });
    }
  },

  disconnect: async () => {
    try {
      await signalRService.stopConnection("app");
    } catch (error) {
      console.error("AppHub: Failed to disconnect:", error);
    } finally {
      set({ onlineUserIds: [], isConnected: false });
    }
  },

  addOnlineUser: (userId: string) => {
    set(state => ({
      onlineUserIds: state.onlineUserIds.includes(userId)
        ? state.onlineUserIds
        : [...state.onlineUserIds, userId],
    }));
  },

  removeOnlineUser: (userId: string) => {
    set(state => ({
      onlineUserIds: state.onlineUserIds.filter(id => id !== userId),
    }));
  },
}));
