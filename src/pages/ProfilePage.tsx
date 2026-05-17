import { ProfileBanner } from "@/components/ui/banners";
import { MyTasksList } from "@/components/ui/lists";

export function ProfilePage() {
  return <div className="overflow-y-auto p-4 space-y-4">
    <ProfileBanner />
    <MyTasksList />
  </div>
}
