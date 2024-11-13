import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children, className, style }) => {
  return (
    <Link to={to} className={className} style={style}>
      {children}
    </Link>
  );
};

export default CustomLink;
