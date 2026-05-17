interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
}

export function PrimaryButton({text, className, ...props}: Props) {
  return <button 
    {...props} 
    className={`border-4 border-primary bg-primary text-background hover:bg-background hover:text-primary transition ${className}`}
  >
    {text}
  </button>
}
