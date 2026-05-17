interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function DangerButton({text, className, ...props}: Props) {
  return <button 
    {...props} 
    className={`border-4 border-color-danger bg-color-danger text-background hover:bg-background hover:text-color-danger transition ${className}`}
  >
    {text}
  </button>
}
