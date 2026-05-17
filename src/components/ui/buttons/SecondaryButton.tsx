interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
}

export function SecondaryButton({text, className, ...props}: Props) {
  return <button 
    {...props} 
    className={`border-4 border-primary hover:bg-primary hover:text-background transition ${className}`}
  >
    {text}
  </button>
}
