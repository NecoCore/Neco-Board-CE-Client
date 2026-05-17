import { XIcon } from "lucide-react";
import { SecondaryIconButton } from "../buttons";
import { CreateTaskForm } from "@/features/forms";
import type { TaskViewResponse } from "@/types/models/response/task-view.response";

interface Props {
  onClose: () => void;
  projectId: string;
  columnId: string;
  taskInfo?: TaskViewResponse;
}

export function CreateTaskModal({onClose, projectId, columnId, taskInfo}: Props) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-primary/40 backdrop-blur-lg flex items-center justify-center">
      <div className="p-4 bg-background border-4 border-primary w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2>Create project</h2>
          <SecondaryIconButton icon={<XIcon />} onClick={onClose} className="border-none"/>
        </div>
        <CreateTaskForm projectId={projectId} columnId={columnId} onCreated={onClose} taskInfo={taskInfo}/>
      </div>
    </div>
  )
}
