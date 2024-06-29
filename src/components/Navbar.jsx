import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import UpcomingIcon from "@mui/icons-material/Upcoming";

function Navbar() {
  return (
    <div className="topNavBar">
      <div>
        <UpcomingIcon />
        <h1>FlowBoard</h1>
      </div>

      <LogoutIcon />
    </div>
  );
}
export default Navbar;
