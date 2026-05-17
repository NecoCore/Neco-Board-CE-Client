import type { TaskStatus } from "@/types/enums"

interface Props {
  status: TaskStatus
}

export function TaskStatusBadge({status}: Props) {
  switch(status) {
    case 'NOT_STARTED':
      return <p className="px-2 py-1 text-sm bg-neutral">Not started</p>
    case 'IN_PROGRESS':
      return <p className="px-2 py-1 text-sm bg-color-info text-background">In progress</p>
    case 'COMPLETED':
      return <p className="px-2 py-1 text-sm bg-color-success text-background">Completed</p>
    case 'ON_HOLD':
      return <p className="px-2 py-1 text-sm bg-color-warning text-background">On hold</p>
    default:
      return <p className="px-2 py-1 text-sm bg-neutral">Not started</p>
  }
}
