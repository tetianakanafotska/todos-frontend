import React from "react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="topNavBar">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <h1>Kanban board</h1>
    </div>
  );
}

export default Navbar;
