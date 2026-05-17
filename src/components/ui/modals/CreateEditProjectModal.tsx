import { XIcon } from "lucide-react";
import { SecondaryIconButton } from "../buttons/SecondaryIconButton";
import { CreateProjectForm } from "@/features/forms";

interface Props {
  onClose: () => void;
}

export function CreateEditProjectModal({onClose}: Props) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-primary/40 backdrop-blur-lg flex items-center justify-center">
      <div className="p-4 bg-background border-4 border-primary w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2>Create project</h2>
          <SecondaryIconButton icon={<XIcon />} onClick={onClose} className="border-none"/>
        </div>
        <CreateProjectForm onCreated={onClose}/>
      </div>
    </div>
  )
}
