import { XIcon, UserPlusIcon, SearchIcon } from "lucide-react";
import { SecondaryIconButton, PrimaryIconButton } from "../buttons";
import { userProjectHttp, usersHttp } from "@/api/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { toast } from "sonner";
import { useState } from "react";
import type { UserResponse } from "@/types/models/response";
import { AvatarImage } from "../images/AvatarImage";

interface Props {
  onClose: () => void;
  projectId: string;
}

const PROJECT_ROLES = [
  { label: "Owner", value: 0 },
  { label: "Moderator", value: 1 },
  { label: "User", value: 2 },
  { label: "Viewer", value: 3 },
];

function UserRow({ user, projectId, onAdded }: { user: UserResponse; projectId: string; onAdded: () => void }) {
  const queryClient = useQueryClient();
  const [role, setRole] = useState(2);

  const mutation = useMutation({
    mutationFn: () => userProjectHttp.add(projectId, user.id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROJECT_LIST, projectId] });
      toast.success(`${user.name} added`);
      onAdded();
    },
    onError: () => toast.error("Error adding user"),
  });

  return (
    <div className="flex items-center gap-2 border-4 border-primary p-2">
      <AvatarImage filePath={user.avatar} className="size-8 border-2 border-primary shrink-0" />
      <span className="flex-1 truncate">{user.name}</span>
      <select
        value={role}
        onChange={(e) => setRole(Number(e.target.value))}
        className="border-4 border-primary p-1 text-sm"
      >
        {PROJECT_ROLES.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      <PrimaryIconButton
        icon={<UserPlusIcon size={16} />}
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      />
    </div>
  );
}

export function AddUserToProjectModal({ onClose, projectId }: Props) {
  const [search, setSearch] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USERS_ALL],
    queryFn: usersHttp.getAllWorkspace,
  });

  const filtered = users?.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-primary/40 backdrop-blur-lg flex items-center justify-center">
      <div className="p-4 bg-background border-4 border-primary w-md space-y-4 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center">
          <h2>Add user to project</h2>
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
            <UserRow key={user.id} user={user} projectId={projectId} onAdded={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}
