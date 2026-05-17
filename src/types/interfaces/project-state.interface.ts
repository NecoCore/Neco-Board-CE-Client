import type { ProjectResponse } from "../models/response";

export interface ProjectState {
  projectId: string | null;
  project: ProjectResponse | null;
  isConnected: boolean;
  connectToProject: (projectId: string) => Promise<void>;
  setProject: (projectId: string) => Promise<void>;
  disconnectFromProject: () => Promise<void>;
}