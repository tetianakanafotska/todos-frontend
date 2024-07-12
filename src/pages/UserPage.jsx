import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@context/authContext";
import profilePic from "@/assets/pic.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
//import userService

function UserPage() {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    profileImg: "",
  });

  const uploadFileRef = useRef();

  useEffect(() => {
    if (user) setUserData({ name: user.name, profileImg: user.profileImg });
  }, []);

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
        console.log("this is response from upload", res);
        //userService.put -- update image
        setUserData((prev) => ({ ...prev, profileImg: res.data.fileUrl }));
      })
      .catch((err) => {
        console.log("error", err);
      });
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
      <button disabled={userData.name === user.name}>Save</button>
    </main>
  );
}

export default UserPage;
