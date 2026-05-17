import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { signalRService } from "./signalr.service";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { SOCKET_EVENTS } from "./socket-events";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { useProjectStore } from "@/store/useProjectStore";

export function useProjectSockets(isConnected: boolean) {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  useEffect(() => {
    if(!isConnected) return;

    const connection = signalRService.getConnection('projects');
    if(!connection) return;

    const onProjectChanged = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] })
    }
    const onProjectDeleted = (id: string) => {
      console.log("onProjectDeleted", id);
      const projectId = useProjectStore((state) => state.projectId);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] })
      if(id === projectId) navigation(ROUTES.PROJECTS.ROOT);
    }

    connection.on(SOCKET_EVENTS.PROJECTS.CREATED, onProjectChanged);
    connection.on(SOCKET_EVENTS.PROJECTS.UPDATED, onProjectChanged);
    connection.on(SOCKET_EVENTS.PROJECTS.DELETED, onProjectDeleted);

    return () => {
      connection.off(SOCKET_EVENTS.PROJECTS.CREATED, onProjectChanged);
      connection.off(SOCKET_EVENTS.PROJECTS.UPDATED, onProjectChanged);
      connection.off(SOCKET_EVENTS.PROJECTS.DELETED, onProjectDeleted);
    }
  }, [isConnected]);
}