const API_HTTP = "api"
const API_FILES = "files"
export const API_WEBSOCKET = "conn"

const HTTP_ROUTES = {
  AUTH: "Auth",
  WORKSPACE_USERS: "User",
  PROJECTS: "project",
  PROJECT_USERS: "users",
  COLUMNS: "column",
  TASK: "task",
}

const FILES_ROUTES = {
  AVATARS: "avatars",
}

export const WEBSOCKET_ROUTES = {
  APP: "app",
  TASK: "task",
  PROJECTS: "projects"
}

export const API_HTTP_ROUTES = {
  AUTH: {
    LOGIN: `/${API_HTTP}/${HTTP_ROUTES.AUTH}/login`,
    REGISTER: `/${API_HTTP}/${HTTP_ROUTES.AUTH}/register`,
    LOGOUT: `/${API_HTTP}/${HTTP_ROUTES.AUTH}/logout`,
    REFRESH: `/${API_HTTP}/${HTTP_ROUTES.AUTH}/refresh`,
    ME: `/${API_HTTP}/${HTTP_ROUTES.AUTH}/me`,
  },
  WORKSPACE_USERS: {
    GET: `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}`,
    GET_ALL: `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}/all`,
    UPDATE_ROLE: (userId: string) => `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}/role/${userId}`,
    UPDATE_PASSWORD: `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}/updatePassword`,
    MY_TASKS: `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}/tasks`,
    DELETE: (userId: string) => `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}/${userId}`,
  },
  PROJECT_USERS: {
    GET_ALL: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.PROJECT_USERS}`,
    ADD: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.PROJECT_USERS}`,
    EDIT_ROLE: (projectId: string, userId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.PROJECT_USERS}/${userId}`,
    REMOVE: (projectId: string, userId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.PROJECT_USERS}/${userId}`,
  },
  PROJECTS: {
    GET_ALL: `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}`,
    GET_MY: `/${API_HTTP}/${HTTP_ROUTES.WORKSPACE_USERS}/projects`,
    GET_BY_ID: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}`,
    CREATE: `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}`,
    UPDATE: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}`,
    DELETE: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}`,
  },
  COLUMNS: {
    GET_ALL: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}`,
    CREATE: (projectId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}`,
    UPDATE: (projectId: string, columnId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}`,
    DELETE: (projectId: string, columnId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}`,
    UPDATE_ORDER: (projectId: string, columnId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/order`,
  },
  TASKS: {
    GET_ALL: (projectId: string, columnId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}`,
    CREATE: (projectId: string, columnId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}`,
    UPDATE: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}`,
    GET_BY_ID: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}`,
    EDIT_TASK_STATUS: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}/status`,
    EDIT_TASK_PRIORITY: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}/priority`,
    EDIT_TASK_COLUMN: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}/column`,
    GET_TASK_USERS: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}/user`,
    ADD_TASK_USER: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}/user`,
    REMOVE_TASK_USER: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}/user`,
    DELETE: (projectId: string, columnId: string, taskId: string) => `/${API_HTTP}/${HTTP_ROUTES.PROJECTS}/${projectId}/${HTTP_ROUTES.COLUMNS}/${columnId}/${HTTP_ROUTES.TASK}/${taskId}`,
  }
}

export const API_FILES_ROUTES = {
  AVATARS: {
    GET: (filePath: string) => `/${API_FILES}/${FILES_ROUTES.AVATARS}/${filePath}`,
  }
}