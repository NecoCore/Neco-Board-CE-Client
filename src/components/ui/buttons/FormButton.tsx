interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
}

export function FormButton({text, disabled = false, className, ...props}: Props) {
  return <button 
    type="submit" 
    className={`w-full border-4 border-primary hover:bg-primary hover:text-background transition ${className}`} 
    {...props}>
    {text}
  </button>
}
