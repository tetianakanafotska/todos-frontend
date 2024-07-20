import React, { useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import placeholder from "@/assets/placeholder.jpg";
import useOutsideClick from "../hooks/useOutsideClick";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@context/userContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <aside id="sidebar" className={isOpen ? "opened" : ""}>
      <div className="menu-icon" ref={ref}>
        <MenuIcon onClick={() => setIsOpen(!isOpen)} />
      </div>

      <div className="userInfo">
        <img
          src={user.profileImg.url || placeholder}
          onClick={() => navigate("/profile")}
        ></img>
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
