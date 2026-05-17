import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { signalRService } from "./signalr.service";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { SOCKET_EVENTS } from "./socket-events";
import { useProjectStore } from "@/store/useProjectStore";

export function useColumnsEvent() {
  const queryClient = useQueryClient();
  const projectId = useProjectStore((state) => state.projectId);
  const isConnected = useProjectStore((state) => state.isConnected);

  useEffect(() => {
    if(!isConnected || !projectId) return;

    const connection = signalRService.getConnection('projects');
    if(!connection) return;

    const onColumnCreated = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COLUMN_PROJECT, projectId] });
    }

    connection.on(SOCKET_EVENTS.COLUMNS.CREATED, onColumnCreated);

    return () => {
      connection.off(SOCKET_EVENTS.COLUMNS.CREATED, onColumnCreated);
    }
  }, [isConnected, projectId])
}