import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@context/userContext";
import profilePic from "@/assets/pic.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import userService from "@services/user.service.js";
import uploadService from "@services/upload.service";
import isEqual from "lodash/isEqual";

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
    console.log("thsi is userData", userData);
  };

  const handleChangeAvatar = () => {
    uploadFileRef.current.click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    uploadService
      .uploadImage(formData)
      .then((res) => {
        setUserData((prev) => ({ ...prev, profileImg: res.data.fileUrl }));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleSave = async () => {
    await userService.put(user._id, userData);
  };

  const isUserDataChanged = !isEqual(
    {
      name: userData.name,
      email: userData.email,
      profileImg: userData.profileImg,
    },
    { name: user.name, email: user.email, profileImg: user.profileImg }
  );

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
      <button disabled={!isUserDataChanged} onClick={handleSave}>
        Save
      </button>
    </main>
  );
}

export default UserPage;
