import { ROUTES } from "@/routes/paths";
import { useAuthStore } from "@/store/useAuthStore";
import { useAppStore } from "@/store/useAppStore";
import { useAppSockets } from "@/api/socket/app.events";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export function AuthGuard({children}: PropsWithChildren) {
  const navigate = useNavigate();
  const {isAuthenticated, isInitializing, reloadUser } = useAuthStore();

  const connect = useAppStore(state => state.connect);
  const disconnect = useAppStore(state => state.disconnect);
  const isConnected = useAppStore(state => state.isConnected);

  useEffect(() => {
    const initAuth = async () => {
      if(!isAuthenticated) {
        await reloadUser().catch(console.error);
      }
    };

    initAuth();
  }, [isAuthenticated, reloadUser])

  useEffect(() => {
    if(!isInitializing && !isAuthenticated) {
      navigate(ROUTES.LOGIN, {replace: true});
    }
  }, [isInitializing, isAuthenticated, navigate])

  useEffect(() => {
    if(!isAuthenticated) return;
    connect();
    return () => { disconnect(); };
  }, [isAuthenticated])

  useAppSockets(isConnected);

  if(isInitializing) {
    return (<div>Loading...</div>)
  };
  if(!isAuthenticated) {
    return null
  }

  return <>{children}</>;
}
