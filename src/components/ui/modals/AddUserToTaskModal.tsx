import { XIcon, UserPlusIcon, SearchIcon, CheckIcon } from "lucide-react";
import { SecondaryIconButton, PrimaryIconButton } from "../buttons";
import { taskHttp, userProjectHttp } from "@/api/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { toast } from "sonner";
import { useState } from "react";
import type { UserProjectResponse } from "@/types/models/response";
import { AvatarImage } from "../images/AvatarImage";

interface Props {
  onClose: () => void;
  projectId: string;
  columnId: string;
  taskId: string;
}

function UserRow({
  user,
  projectId,
  columnId,
  taskId,
  isAdded,
}: {
  user: UserProjectResponse;
  projectId: string;
  columnId: string;
  taskId: string;
  isAdded: boolean;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => taskHttp.addUser(projectId, columnId, taskId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASK_USERS, taskId] });
      toast.success(`${user.name} added to task`);
    },
    onError: () => toast.error("Error adding user"),
  });

  return (
    <div className={`flex items-center gap-2 border-4 p-2 ${isAdded ? "border-color-success" : "border-primary"}`}>
      <AvatarImage filePath={user.avatar} className="size-8 border-2 border-primary shrink-0" />
      <span className="flex-1 truncate">{user.name}</span>
      {isAdded ? (
        <CheckIcon size={16} className="text-color-success shrink-0" />
      ) : (
        <PrimaryIconButton
          icon={<UserPlusIcon size={16} />}
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        />
      )}
    </div>
  );
}

export function AddUserToTaskModal({ onClose, projectId, columnId, taskId }: Props) {
  const [search, setSearch] = useState("");

  const { data: projectUsers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROJECT_LIST, projectId],
    queryFn: () => userProjectHttp.getAll(projectId),
    enabled: !!projectId,
  });

  const { data: taskUsers } = useQuery({
    queryKey: [QUERY_KEYS.TASK_USERS, taskId],
    queryFn: () => taskHttp.getTaskUsers(projectId, columnId, taskId),
    enabled: !!projectId && !!columnId && !!taskId,
  });

  const addedIds = new Set(taskUsers?.map((u) => u.id) ?? []);

  const filtered = projectUsers?.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-primary/40 backdrop-blur-lg flex items-center justify-center">
      <div className="p-4 bg-background border-4 border-primary w-md space-y-4 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center">
          <h2>Add user to task</h2>
          <SecondaryIconButton icon={<XIcon />} onClick={onClose} className="border-none" />
        </div>
        <div className="flex items-center border-4 border-primary p-2 gap-2">
          <SearchIcon size={16} className="shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 outline-none bg-transparent"
            autoFocus
          />
        </div>
        <div className="space-y-2 overflow-y-auto flex-1">
          {isLoading && <p>Loading...</p>}
          {!isLoading && filtered.length === 0 && <p>No users found</p>}
          {filtered.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              projectId={projectId}
              columnId={columnId}
              taskId={taskId}
              isAdded={addedIds.has(user.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
