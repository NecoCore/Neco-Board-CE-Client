export const ROUTES = {
  PROFILE: "/",
  LOGIN: "/login",
  USERS: "/users",
  PROJECTS: {
    ROOT: "/projects",
    BOARD: (projectId: string) => `/projects/${projectId}`,
    SETTINGS: (projectId: string) => `/projects/${projectId}/settings`,
    USERS: (projectId: string) => `/projects/${projectId}/users`
  },
  SETTINGS: {
    ROOT: "/settings"
  }
}