import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode,
}

export function SecondaryIconButton({icon, className, ...props}: Props) {
  return <button 
    {...props} 
    className={`border-4 border-primary hover:bg-primary hover:text-background transition icon ${className}`}
  >
    {icon}
  </button>
}
