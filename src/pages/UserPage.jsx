import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@context/userContext";
import profilePic from "@/assets/pic.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import userService from "@services/user.service.js";
import imageService from "@services/image.service";
import isEqual from "lodash/isEqual";
import Modal from "../components/Modal";

function UserPage() {
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileImg: "",
  });
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const uploadFileRef = useRef();

  useEffect(() => {
    if (user)
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

  const handleUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    imageService
      .upload(formData)
      .then((res) => {
        const originalUrl = res.data.image.path;
        const resizing = "w_400,c_fill,g_auto";
        const parts = originalUrl.split("/upload/");
        const newUrl = parts[0] + "/upload/" + resizing + "/" + parts[1];
        setUserData((prev) => ({ ...prev, profileImg: newUrl }));
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => setLoading(false));
  };

  const handleSave = async () => {
    await userService.put(user._id, userData);
  };

  const handleDeletePic = () => {};

  const isUserDataChanged = !isEqual(
    {
      name: userData.name,
      email: userData.email,
      profileImg: userData.profileImg,
    },
    { name: user.name, email: user.email, profileImg: user.profileImg }
  );

  return (
    <main className="user">
      {loading && <div className="loader"></div>}
      <Modal openModal={openModal} closeModal={() => setOpenModal(false)}>
        <img src={userData.profileImg} alt="profile picture" />
        <button onClick={() => uploadFileRef.current.click()}>Change</button>
        <button onClick={handleDeletePic}>Remove</button>
      </Modal>
      <div className="user-pic" onClick={() => setOpenModal(true)}>
        <img src={userData.profileImg} alt="profile picture" />
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
