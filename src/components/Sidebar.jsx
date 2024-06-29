import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import pic from "../assets/pic.jpeg";
import useOutsideClick from "../hooks/useOutsideClick";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <aside id="sidebar" className={isOpen ? "opened" : ""}>
      <div className="menu-icon" ref={ref}>
        <MenuIcon onClick={() => setIsOpen(!isOpen)} />
      </div>

      <div className="userInfo">
        <img src={pic} onClick={() => navigate("/user")}></img>
        <p>Tetiana K.</p>
      </div>
      <NavLink to="/">
        <HomeOutlinedIcon />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/about">
        <InfoOutlinedIcon />
        <span>About</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;
