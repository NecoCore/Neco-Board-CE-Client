export function useAppSockets(_isConnected: boolean) {
  // UserConnected / UserDisconnected listeners are registered in useAppStore.connect()
  // before startConnection() to avoid missing events during the connection handshake.
}
