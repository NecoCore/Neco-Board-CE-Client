import { PrimaryButton } from "@/components/ui/buttons";
import { ProjectUserList } from "@/components/ui/lists";
import { AddUserToProjectModal } from "@/components/ui/modals";
import { useProjectStore } from "@/store/useProjectStore";
import { useState } from "react";

export function ProjectUsersPage() {
  const [usersCount, setUsersCount] = useState<number>(-1);
  const [usersOnlineCount, setUsersOnlineCount] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectId = useProjectStore((state) => state.projectId);

  return <div className="p-4 space-y-3 overflow-y-auto">
    <div className="flex border-4 border-primary p-2 items-center justify-between">
      <div className="ml-4">
        {
          usersCount === -1 || usersOnlineCount === -1
            ? <h3>Loading...</h3>
            : usersCount === 0
            ? <h3>No users</h3>
            : <h3>Online: {usersOnlineCount}/{usersCount}</h3>
        }
      </div>
      <PrimaryButton text="Add User" onClick={() => setIsModalOpen(true)} />
    </div>
    <ProjectUserList setUsersCount={setUsersCount} setUsersOnlineCount={setUsersOnlineCount} />
    {isModalOpen && projectId && (
      <AddUserToProjectModal onClose={() => setIsModalOpen(false)} projectId={projectId} />
    )}
  </div>
}
