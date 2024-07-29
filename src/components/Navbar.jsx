import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "@/assets/logo.png";
import { AuthContext } from "@context/authContext.jsx";
import { IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { logOutUser } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {!["/signup", "/login"].includes(location.pathname) && (
        <div className="topNavBar">
          <img src={logo} alt="todo logo" width="90" />

          <IconButton onClick={logOutUser}>
            <LogoutIcon />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default Navbar;
