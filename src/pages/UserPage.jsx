import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@context/userContext";
import profilePic from "@/assets/pic.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import userService from "@services/user.service.js";
import { flushSync } from "react-dom";

function UserPage() {
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileImg: "",
  });

  const uploadFileRef = useRef();

  useEffect(() => {
    if (user) console.log("this is user", user);
    setUserData({
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
    });
  }, [user]);

  const handleOnChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeAvatar = () => {
    uploadFileRef.current.click();
  };

  const handleUpload = (e) => {
    console.log("this is file", e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:5005/upload", formData)
      .then((res) => {
        console.log("this is response from upload", res.data);
        setUserData((prev) => ({ ...prev, profileImg: res.data.fileUrl }));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleSave = async () => {
    await userService.put(user._id, userData);
  };

  return (
    <main className="login">
      <div className="login-pic" onClick={handleChangeAvatar}>
        <img src={userData.profileImg} alt="profile picture" width="150" />
        <div className="edit-icon-container">
          <EditIcon fontSize="small" />
        </div>
        <input
          type="file"
          ref={uploadFileRef}
          accept="image"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </div>
      <label>
        Name:
        <input
          name="name"
          type="text"
          value={userData.name}
          onChange={handleOnChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          type="text"
          value={userData.email}
          onChange={handleOnChange}
        />
      </label>
      <button
        disabled={
          // userData.name === user.name ||
          // userData.profileImg === user.profileImg ||
          // userData.email === user.email
          userData.profileImg === user.profileImg
        }
        onClick={handleSave}
      >
        Save
      </button>
    </main>
  );
}

export default UserPage;
