import { Outlet } from "react-router-dom";
import { MainHeader } from "@/components/ui/headers";
import { MainSidebar } from "@/components/ui/sidebars";

export function MainLayout() {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-auto">
      <MainHeader />
      <MainSidebar />
      <Outlet />
    </div>
  )
}
