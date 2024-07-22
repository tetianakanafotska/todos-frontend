import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import { AuthContext } from "@context/authContext.jsx";
import { IconButton } from "@mui/material";

function Navbar() {
  const { logOutUser } = useContext(AuthContext);

  return (
    <div className="topNavBar">
      <div>
        <UpcomingIcon />
        <h1>FlowBoard</h1>
      </div>
      <IconButton onClick={logOutUser}>
        <LogoutIcon />
      </IconButton>
    </div>
  );
}
export default Navbar;
