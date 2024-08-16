import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const CustomNavLink = ({ to, isOpen, setIsOpen, children }) => {
  const location = useLocation();

  const handleClick = (event) => {
    if (location.pathname === to) {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <NavLink to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
