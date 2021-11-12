import React from "react";
import { Link } from "gatsby";

export const PageLink = (props: {
  className?: string;
  to: string;
  type?: string;
  style?: any;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseOver?: () => void;
  children?: any;
  state?: any;
}) => (
  <Link
    type={props.type}
    style={props.style}
    className={props.className}
    activeClassName="active"
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
    to={props.to}
    state={props.state}
  >
    {props.children}
  </Link>
);
