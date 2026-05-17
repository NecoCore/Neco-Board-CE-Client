export const SOCKET_EVENTS = {
  PROJECTS: {
    CREATED: "ProjectCreated",
    UPDATED: "ProjectUpdated",
    DELETED: "ProjectDeleted",
    CONNECT: "JoinProject",
    DISCONNECT: "LeaveProject"
  },
  COLUMNS: {
    CREATED: "ColumnCreated",
    UPDATED: "ColumnUpdated",
    UPDATED_ORDER: "ColumnUpdatedOrder",
    DELETED: "ColumnDeleted",
  },
  TASKS: {
    CREATED: "TaskCreated",
    UPDATED: "TaskUpdated",
    PRIORITY_UPDATED: "TaskPriorityUpdated",
    STATUS_UPDATED: "TaskStatusUpdated",
    COLUMN_UPDATED: "TaskColumnUpdated",
    DELETED: "TaskDeleted",
  },
  USERS: {
    ADDED_TO_PROJECT: "UserAddedToProject",
    REMOVED_FROM_PROJECT: "UserRemovedFromProject",
    ROLE_UPDATED: "UserRoleUpdatedInProject",
    GET_ONLINE: "GetOnlineUsers",
    CONNECT: "UserConnected",
    DISCONNECT: "UserDisconnected",
  }
} as const;