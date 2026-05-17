import { columnHttp, taskHttp } from "@/api/http";
import { useProjectStore } from "@/store/useProjectStore"
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnTile } from "../tiles/ColumnTile";
import { SecondaryButton } from "../buttons";
import { useState } from "react";
import { CreateColumnModal } from "../modals/CreateColumnModal";
import { useColumnsEvent } from "@/api/socket/column.event";
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { toast } from "sonner";

export function ColumnList() {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const projectId = useProjectStore((state) => state.projectId);
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.COLUMN_PROJECT, projectId!],
    queryFn: async () => await columnHttp.getAll(projectId!),
    enabled: !!projectId,
  });

  const moveTaskMutation = useMutation({
    mutationFn: async ({ taskId, sourceId, destId }: { taskId: string, sourceId: string, destId: string, sourceIndex: number, destIndex: number }) =>{ 
      await taskHttp.editTaskColumn(projectId!, sourceId, taskId, destId)
    },
    onMutate: async ({ sourceId, destId, sourceIndex, destIndex}) => {
      const sourceKey = [QUERY_KEYS.TASK_COLUMN, sourceId];
      const destKey = [QUERY_KEYS.TASK_COLUMN, destId];

      await queryClient.cancelQueries({ queryKey: sourceKey });
      if (sourceId !== destId) {
        await queryClient.cancelQueries({ queryKey: destKey });
      }
      
      const previousSource = queryClient.getQueryData<any[]>(sourceKey);
      const previousDest = queryClient.getQueryData<any[]>(destKey);

      if(sourceId === destId) {
        queryClient.setQueryData(sourceKey, (oldData: any[]) => {
          if(!oldData) return oldData;
          const newData = [...oldData];
          const [movedTask] = newData.splice(sourceIndex, 1);
          newData.splice(destIndex, 0, movedTask);
          return newData;
        })
      } else {
        let movedTask: any;
        queryClient.setQueryData(sourceKey, (oldData: any[]) => {
          if(!oldData) return oldData;
          const newData = [...oldData];
          [movedTask] = newData.splice(sourceIndex, 1);
          return newData;
        })

        queryClient.setQueryData(destKey, (oldData: any[]) => {
          const newData = oldData ? [...oldData] : [];
          if(movedTask) {
            newData.splice(destIndex, 0, movedTask);
          }
          return newData;
        })
      }

      return { sourceKey, destKey, previousSource, previousDest }
    },
    onError: (err, variables, context) => {
      toast.error("Error to move task");
      if(context) {
        queryClient.setQueryData(context.sourceKey, context.previousSource);
        queryClient.setQueryData(context.destKey, context.previousDest);
      }
    },
    onSettled: (data, err, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, variables.sourceId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, variables.destId] });
    },
  })

  const switchModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    console.log(`Drop task ${draggableId} from ${source.droppableId} to ${destination.droppableId}`)
    moveTaskMutation.mutate({
      taskId: draggableId,
      sourceId: source.droppableId,
      destId: destination.droppableId,
      sourceIndex: source.index,
      destIndex: destination.index
    })
  }
  
  useColumnsEvent();

  if(!projectId) return <p>404</p>
  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  if(!data) return (<p>No data</p>)


  return <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex gap-2 h-full">
      {
        data.map((column, index) => (
          <ColumnTile key={index} column={column} projectId={projectId} />
        ))
      }
      <SecondaryButton className="min-w-75 h-fit" text="Create new column" onClick={switchModal}/>
      {
        isModalOpen && <CreateColumnModal onClose={switchModal} projectId={projectId} />
      }
    </div>
  </DragDropContext>
}
