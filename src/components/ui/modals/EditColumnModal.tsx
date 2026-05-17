import { XIcon } from "lucide-react";
import { SecondaryIconButton } from "../buttons";
import { EditColumnForm } from "@/features/forms";

interface Props {
  onClose: () => void;
  projectId: string;
  columnId: string;
  defaultName: string;
}

export function EditColumnModal({ onClose, projectId, columnId, defaultName }: Props) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-primary/40 backdrop-blur-lg flex items-center justify-center">
      <div className="p-4 bg-background border-4 border-primary w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2>Edit column</h2>
          <SecondaryIconButton icon={<XIcon />} onClick={onClose} className="border-none" />
        </div>
        <EditColumnForm onCreated={onClose} projectId={projectId} columnId={columnId} defaultName={defaultName} />
      </div>
    </div>
  );
}
