import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import pic from "../assets/pic.jpeg";
import useOutsideClick from "../hooks/useOutsideClick";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <aside id="sidebar" className={isOpen ? "opened" : ""}>
      <i
        id="menu-btn"
        className="bx bx-menu"
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
      ></i>
      <div className="userInfo">
        <img src={pic}></img>
        <p>Tetiana K.</p>
      </div>
      <NavLink to="/">
        <i className="bx bx-home-alt-2"></i>
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/about">
        <i className="bx bx-info-circle"></i>
        <span>About</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;
