import { EditIcon, Trash2Icon, UserPlusIcon, XIcon } from "lucide-react";
import { SecondaryIconButton } from "../buttons";
import { useProjectStore } from "@/store/useProjectStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskHttp } from "@/api/http";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { useState } from "react";
import { CreateTaskModal } from "./CreateTaskModal";
import { AddUserToTaskModal } from "./AddUserToTaskModal";
import { convertTypeTP, convertTypeTS } from "@/utils/enum-convetor";
import { toast } from "sonner";

interface Props {
  taskId: string;
  columnId: string;
  onClose: () => void;
}

export function TaskViewModal({ onClose, columnId, taskId }: Props) {
  const projectId = useProjectStore((state) => state.projectId);
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const changeTaskPriority = useMutation({
    mutationFn: async (priority: number) => await taskHttp.editTaskPriority(projectId!, columnId, taskId, priority),
    onSuccess: () => {
      toast.success("Task priority changed");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_VIEW, taskId] });
    },
    onError: () => toast.error("Error to change task priority"),
  });

  const changeTaskStatus = useMutation({
    mutationFn: async (status: number) => await taskHttp.editTaskStatus(projectId!, columnId, taskId, status),
    onSuccess: () => {
      toast.success("Task status changed");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_VIEW, taskId] });
    },
    onError: () => toast.error("Error to change task status"),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: () => taskHttp.delete(projectId!, columnId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_COLUMN, columnId] });
      toast.success("Task deleted");
      onClose();
    },
    onError: () => toast.error("Error deleting task"),
  });

  const removeUserMutation = useMutation({
    mutationFn: (userId: string) => taskHttp.removeUser(projectId!, columnId, taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_USERS, taskId] });
      toast.success("User removed");
    },
    onError: () => toast.error("Error removing user"),
  });

  const { data: taskInfo, isLoading: taskIsLoading, error: taskError } = useQuery({
    queryKey: [QUERY_KEYS.TASK_VIEW, taskId],
    queryFn: async () => taskHttp.getById(projectId!, columnId, taskId),
    enabled: !!projectId && !!columnId && !!taskId,
  });

  const { data: userTaskInfo, isLoading: userTaskIsLoading, error: userTaskError } = useQuery({
    queryKey: [QUERY_KEYS.TASK_USERS, taskId],
    queryFn: async () => taskHttp.getTaskUsers(projectId!, columnId, taskId),
    enabled: !!projectId && !!columnId && !!taskId,
  });

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-primary/40 backdrop-blur-lg flex items-center justify-center">
      <div className="bg-background border-4 border-primary h-1/2 flex flex-col">
        <div className="flex justify-between items-center p-2 border-b-4 border-primary">
          <h2 className="ml-2">{taskInfo?.name ?? "Error"}</h2>
          <div className="flex">
            <SecondaryIconButton
              icon={<Trash2Icon size={16} />}
              onClick={() => deleteTaskMutation.mutate()}
              disabled={deleteTaskMutation.isPending}
              className="border-none text-color-danger"
            />
            <SecondaryIconButton icon={<XIcon />} onClick={onClose} className="border-none" />
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-lg border-r-4 border-primary flex flex-col">
            {taskIsLoading ? (
              <div className="p-4">Loading...</div>
            ) : taskError ? (
              <div className="p-4">{taskError.message}</div>
            ) : (
              <>
                <div className="space-y-2 flex-1 p-4 overflow-y-auto">
                  <h3>{taskInfo?.description}</h3>
                  <p>{taskInfo?.text}</p>
                </div>
                <div className="flex justify-between border-t-4 border-primary p-2 items-center">
                  <div className="flex gap-2 ml-2">
                    <select
                      value={taskInfo ? convertTypeTP(taskInfo.priority) : 0}
                      onChange={(e) => changeTaskPriority.mutate(Number(e.target.value))}
                      disabled={changeTaskPriority.isPending}
                      className="border-4 border-primary p-1"
                    >
                      <option value="0">Low</option>
                      <option value="1">Medium</option>
                      <option value="2">High</option>
                      <option value="3">Urgent</option>
                    </select>
                    <select
                      value={taskInfo ? convertTypeTS(taskInfo.status) : 0}
                      onChange={(e) => changeTaskStatus.mutate(Number(e.target.value))}
                      disabled={changeTaskStatus.isPending}
                      className="border-4 border-primary p-1"
                    >
                      <option value="0">Not started</option>
                      <option value="1">In Progress</option>
                      <option value="2">Completed</option>
                      <option value="3">On hold</option>
                    </select>
                  </div>
                  <SecondaryIconButton icon={<EditIcon />} onClick={() => setIsEditModalOpen(true)} className="border-none" />
                </div>
              </>
            )}
          </div>
          <div className="w-sm p-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3>Users</h3>
              <SecondaryIconButton
                icon={<UserPlusIcon size={16} />}
                className="border-none"
                onClick={() => setIsAddUserOpen(true)}
              />
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto">
              {userTaskIsLoading ? (
                <p>Loading...</p>
              ) : userTaskError ? (
                <p>{userTaskError.message}</p>
              ) : (
                userTaskInfo?.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-2 border-primary p-1">
                    <span className="truncate">{user.name}</span>
                    <SecondaryIconButton
                      icon={<XIcon size={14} />}
                      className="border-none text-color-danger shrink-0"
                      onClick={() => removeUserMutation.mutate(user.id)}
                      disabled={removeUserMutation.isPending}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="z-10">
          <CreateTaskModal onClose={() => setIsEditModalOpen(false)} projectId={projectId!} columnId={columnId} taskInfo={taskInfo!} />
        </div>
      )}
      {isAddUserOpen && (
        <div className="z-10">
          <AddUserToTaskModal
            onClose={() => setIsAddUserOpen(false)}
            projectId={projectId!}
            columnId={columnId}
            taskId={taskId}
          />
        </div>
      )}
    </div>
  );
}
