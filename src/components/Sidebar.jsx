import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import placeholder from "@/assets/placeholder.jpg";
import useOutsideClick from "../hooks/useOutsideClick";
import { UserContext } from "@context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HelpIcon from "@mui/icons-material/Help";
import { IconButton, Typography, Avatar } from "@mui/material";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const { user } = useContext(UserContext);
  const [profileUrl, setProfileUrl] = useState(null);

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    if (user.profileImg) {
      setProfileUrl(user.profileImg.url);
    } else {
      setProfileUrl(placeholder);
    }
  }, [user]);

  return (
    <>
      {!["/signup", "/login"].includes(location.pathname) && (
        <aside id="sidebar" ref={ref} className={isOpen ? "opened" : ""}>
          <div>
            <IconButton
              className="menu-icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <NavLink
            to="/profile"
            className="userInfo"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {user.profileImg.url ? (
              <IconButton sx={{ padding: "2px" }}>
                <img
                  src={profileUrl}
                  alt="profile picture"
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                />
              </IconButton>
            ) : (
              <IconButton sx={{ padding: "2px" }}>
                <Avatar
                  sx={{
                    width: 45,
                    height: 45,
                    bgcolor: "tags.medium",
                    color: "black.light",
                  }}
                >
                  {user.name[0]}
                </Avatar>
              </IconButton>
            )}

            <Typography
              variant="body1"
              sx={{
                fontWeight: "700",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {user.name}
            </Typography>
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {({ isActive }) => (
              <>
                {isActive ? <GridViewSharpIcon /> : <GridViewOutlinedIcon />}
                <Typography variant="body1" component="span">
                  Dashboard
                </Typography>
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {({ isActive }) => (
              <>
                {isActive ? <HelpIcon /> : <HelpOutlineOutlinedIcon />}
                <Typography variant="body1" component="span">
                  About
                </Typography>
              </>
            )}
          </NavLink>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
