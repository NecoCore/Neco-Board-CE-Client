import type { PropsWithChildren } from "react"
import { NavLink } from "react-router-dom"

interface Props {
  to: string
  title: string
}

export function BoardNavButton({to, title, children}: PropsWithChildren<Props>) {
  return <NavLink end to={to} title={title} className="board">{children}</NavLink>
}
