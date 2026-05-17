import { ROUTES } from "@/routes/paths";
import { CircleUserIcon, FolderKanbanIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { MainNavButton } from "../nav";


export function MainSidebar() {
  const { isAdmin } = useAuthStore();

  return <div className="sidebar main">
    <div className="flex gap-2 flex-col">
      <MainNavButton title="Profile" to={ROUTES.PROFILE}>
        <CircleUserIcon className="size-8"/>
      </MainNavButton>
      <MainNavButton title="Board" to={ROUTES.PROJECTS.ROOT}>
        <FolderKanbanIcon className="size-8"/>
      </MainNavButton>
      {
        isAdmin() && (
          <MainNavButton title="Users" to={ROUTES.USERS}>
            <UsersIcon className="size-8"/>
          </MainNavButton>
        )
      }
    </div>
    <MainNavButton title="Settings" to={ROUTES.SETTINGS.ROOT}>
      <SettingsIcon className="size-8"/>
    </MainNavButton>
  </div>
}
