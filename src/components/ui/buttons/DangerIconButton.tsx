import type { ReactNode } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
}

export function DangerIconButton({icon, className, ...props}: Props) {
  return <button 
    {...props} 
    className={`border-4 border-color-danger bg-color-danger text-background icon hover:bg-background hover:text-color-danger transition ${className}`}
  >
    {icon}
  </button>
}
