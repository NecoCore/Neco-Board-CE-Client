import { LoginPage, ProfilePage, ProjectBoardPage, ProjectSettingsPage, ProjectUsersPage, SettingsPage, UsersPage } from "@pages/index";
import { MainLayout, ProjectLayout, SettingsLayout } from "@/components/layouts";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./paths";
import { AuthGuard } from "@/features/guards";


export const router = createBrowserRouter([
  {
    path: ROUTES.PROFILE,
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <ProfilePage />
      },
      {
        path: ROUTES.PROJECTS.ROOT,
        element: <ProjectLayout />,
        children: [
          {
            index: true,
            element: <ProjectBoardPage />
          },
          {
            path: ":projectId",
            element: <ProjectBoardPage />
          },
          {
            path: ":projectId/settings",
            element: <ProjectSettingsPage />
          },
          {
            path: ":projectId/users",
            element: <ProjectUsersPage />
          }
        ]
      },
      {
        path: ROUTES.SETTINGS.ROOT,
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <SettingsPage />
          }
        ]
      },
      {
        path: ROUTES.USERS,
        element: <UsersPage />
      }
    ]
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />
  }
]);