export interface AppState {
  onlineUserIds: string[];
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  addOnlineUser: (userId: string) => void;
  removeOnlineUser: (userId: string) => void;
}