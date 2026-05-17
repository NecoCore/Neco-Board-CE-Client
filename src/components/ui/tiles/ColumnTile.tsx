import type { ColumnResponse } from "@/types/models/response";
import { SecondaryButton, SecondaryIconButton } from "../buttons";
import { EditIcon, Trash2Icon } from "lucide-react";
import { TaskColumnList } from "../lists/TaskColumnList";
import { useState } from "react";
import { CreateTaskModal, EditColumnModal } from "../modals";
import { Droppable } from "@hello-pangea/dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { columnHttp } from "@/api/http";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { toast } from "sonner";

interface Props {
  column: ColumnResponse;
  projectId: string;
}

export function ColumnTile({ column, projectId }: Props) {
  const queryClient = useQueryClient();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => columnHttp.delete(projectId, column.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COLUMN_PROJECT, projectId] });
      toast.success("Column deleted");
    },
    onError: () => {
      toast.error("Error deleting column");
    },
  });

  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`space-y-2 min-w-75 ${snapshot.isDraggingOver ? 'outline-1 outline-color-info' : 'outline-none'}`}
        >
          <div className="flex items-center justify-between p-2 border-4 border-primary">
            <h2 className="ml-2">{column.name}</h2>
            <div className="flex">
              <SecondaryIconButton icon={<EditIcon size={16} />} className="border-none" onClick={() => setIsEditOpen(true)} />
              <SecondaryIconButton
                icon={<Trash2Icon size={16} />}
                className="border-none text-color-danger"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              />
            </div>
          </div>
          <TaskColumnList projectId={projectId} columnId={column.id} />
          {provided.placeholder}
          <SecondaryButton text="Create new task" className="w-full" onClick={() => setIsCreateTaskOpen(true)} />
          {isCreateTaskOpen && (
            <CreateTaskModal onClose={() => setIsCreateTaskOpen(false)} projectId={projectId} columnId={column.id} />
          )}
          {isEditOpen && (
            <EditColumnModal onClose={() => setIsEditOpen(false)} projectId={projectId} columnId={column.id} defaultName={column.name} />
          )}
        </div>
      )}
    </Droppable>
  );
}
