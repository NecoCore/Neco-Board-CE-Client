import { useAuthStore } from "@/store/useAuthStore"
import { AvatarImage } from "../images/AvatarImage";
import { SecondaryIconButton } from "../buttons/SecondaryIconButton";
import { MoreVerticalIcon } from "lucide-react";

export function ProfileBanner() {
  const { user } = useAuthStore();

  if(!user) return <div>Loading...</div>

  return <div className="p-2 border-4 border-primary flex gap-4 items-center">
    <AvatarImage filePath={user.avatar} className="size-16" />
    <div>
      <h2>{user.name}</h2>
      <p>{user.login}</p>
    </div>
    <SecondaryIconButton icon={<MoreVerticalIcon />} className="ml-auto mr-2"/>
  </div>
}
