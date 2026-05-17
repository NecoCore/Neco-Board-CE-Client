import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string
  title: string
}

export function MainNavButton({title, to, children}: PropsWithChildren<Props>) {
  return (
    <NavLink to={to} title={title} className="main">
      {children}
    </NavLink>
  )
}
