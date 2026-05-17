import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode,
}

export function PrimaryIconButton({icon, className, ...props}: Props) {
  return <button 
    {...props} 
    className={`border-4 border-primary bg-primary text-background hover:bg-background hover:text-primary transition icon ${className}`}
  >
    {icon}
  </button>
}
