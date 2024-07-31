import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import placeholder from "@/assets/placeholder.jpg";
import useOutsideClick from "../hooks/useOutsideClick";
import { UserContext } from "@context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profileUrl, setProfileUrl] = useState(null);

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    if (user.profileImg) {
      setProfileUrl(user.profileImg.url);
    } else {
      setProfileUrl(placeholder);
    }
  }, [user]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const handleImageError = () => {
    setIsLoading(false);
  };

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

          <div className="userInfo">
            <IconButton
              sx={{
                padding: "2px",
              }}
              onClick={() => navigate("/profile")}
            >
              {isLoading && <CircularProgress />}
              <img
                src={profileUrl}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: isLoading ? "none" : "block" }}
              />
            </IconButton>

            <Typography variant="body1" sx={{ fontWeight: "700" }}>
              {user.name}
            </Typography>
          </div>
          <NavLink to="/">
            <HomeOutlinedIcon />
            <Typography variant="body1" component="span">
              Dashboard
            </Typography>
          </NavLink>
          <NavLink to="/about">
            <InfoOutlinedIcon />
            <Typography variant="body1" component="span">
              About
            </Typography>
          </NavLink>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
