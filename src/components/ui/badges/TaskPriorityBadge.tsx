import type { TaskPriority } from "@/types/enums"

interface Props {
  priority: TaskPriority
}

export function TaskPriorityBadge({priority}: Props) {
  switch(priority) {
    case 'LOW':
      return <p className="px-2 py-1 text-sm bg-neutral">Low</p>
    case 'MEDIUM':
      return <p className="px-2 py-1 text-sm bg-color-info text-background">Medium</p>
    case 'HIGH':
      return <p className="px-2 py-1 text-sm bg-color-warning text-background">High</p>
    case 'URGENT':
      return <p className="px-2 py-1 text-sm bg-color-danger text-background">Urgent</p>
    default:
      return <p className="px-2 py-1 text-sm bg-neutral">Low</p>
  }
}
