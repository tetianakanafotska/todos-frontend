import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import pic from "../assets/pic.jpeg";

function Sidebar() {
  const [openSideBar, setOpenSidebar] = useState("");
  const toggleSidebar = () => {
    openSideBar === "" ? setOpenSidebar("opened") : setOpenSidebar("");
  };

  return (
    <aside className={openSideBar}>
      <i id="menu-btn" className="bx bx-menu" onClick={toggleSidebar}></i>
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
