import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const CustomNavLink = ({ to, isOpen, setIsOpen, children, className }) => {
  const location = useLocation();

  const handleClick = (event) => {
    if (location.pathname === to) {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <NavLink to={to} onClick={handleClick} className={className}>
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
