import type { TaskLocal } from "@/types/models/local"
import { TaskPriorityBadge, TaskStatusBadge } from "../badges"
import { useState } from "react"
import { TaskViewModal } from "../modals"
import { Draggable } from "@hello-pangea/dnd"

interface Props {
  task: TaskLocal
  index: number
}

export function TaskCard({task, index}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const switchModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return <>
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`border-4 border-primary p-2 space-y-2 bg-background ${snapshot.isDragging ? 'shadow-lg ring-2 ring-primary/50' : ''}`} 
          onClick={switchModal}
        >
          <h3>{task.name}</h3>
          <p className="line-clamp-2">{task.description}</p>
          <div className="flex gap-2">
            <TaskPriorityBadge priority={task.priority} />
            <TaskStatusBadge status={task.status} />
          </div>
        </div>
      )}
    </Draggable>
    {
      isModalOpen && <TaskViewModal taskId={task.id} columnId={task.columnId} onClose={switchModal} />
    }
  </>
}
