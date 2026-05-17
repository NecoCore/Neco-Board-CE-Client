import { NavLink } from "react-router-dom"

interface Props {
  title: string
  to: string
}

export function ProjectNavButton({title, to}: Props) {
  return <NavLink to={to} className="project">{title}</NavLink>
}
