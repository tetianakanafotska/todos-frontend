import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import { AuthContext } from "@context/authContext.jsx";

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div className="topNavBar">
      <div>
        <UpcomingIcon />
        <h1>FlowBoard</h1>
      </div>

      <LogoutIcon onClick={logOutUser} />
    </div>
  );
}
export default Navbar;
