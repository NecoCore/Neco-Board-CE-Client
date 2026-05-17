import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { signalRService } from "./signalr.service";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { SOCKET_EVENTS } from "./socket-events";
import { useProjectStore } from "@/store/useProjectStore";

export function useTaskEvent(thisColumnId: string) {
  const queryClient = useQueryClient();
  const projectId = useProjectStore((state) => state.projectId);
  const isConnected = useProjectStore((state) => state.isConnected);

  useEffect(() => {
    if(!isConnected || !projectId) return;

    const connection = signalRService.getConnection('projects');
    if(!connection) return;

    const onTaskCreated = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, thisColumnId] });
    }

    const onTaskColumnUpdated = ({ oldColumnId, newColumnId }: { oldColumnId: string, newColumnId: string }) => {
      if(oldColumnId === thisColumnId) queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, oldColumnId] });
      if(newColumnId === thisColumnId) queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, newColumnId] });
    }

    const onTaskUpdated = (columnId: string) => {
      if(thisColumnId === columnId) queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, columnId] });
    }

    connection.on(SOCKET_EVENTS.TASKS.CREATED, onTaskCreated);
    connection.on(SOCKET_EVENTS.TASKS.COLUMN_UPDATED, onTaskColumnUpdated);
    connection.on(SOCKET_EVENTS.TASKS.UPDATED, onTaskUpdated);

    return () => {
      connection.off(SOCKET_EVENTS.TASKS.CREATED, onTaskCreated);
      connection.off(SOCKET_EVENTS.TASKS.COLUMN_UPDATED, onTaskColumnUpdated);
    }
  }, [isConnected, projectId, thisColumnId])
}