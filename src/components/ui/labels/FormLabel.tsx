interface Props {
  title: string
}

export function FormLabel({title}: Props) {
  return <label className="mb-1 block text-sm font-medium">{title}</label>
}
