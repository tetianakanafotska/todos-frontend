import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@context/userContext";
import placeholder from "@/assets/placeholder.jpg";
import EditIcon from "@mui/icons-material/Edit";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import userService from "@services/user.service.js";
import imageService from "@services/image.service";
import isEqual from "lodash/isEqual";
import Modal from "../components/Modal";
import { IconButton, TextField, Button } from "@mui/material";

function UserPage() {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileImg: { url: "", publicId: "" },
  });
  const [apiLoading, setApiLoading] = useState("idle");
  const [imgLoading, setImgLoading] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const uploadFileRef = useRef();

  useEffect(() => {
    if (user) {
      const { name, email, profileImg } = user;
      setUserData({
        name,
        email,
        profileImg: {
          url: profileImg?.url || "",
          publicId: profileImg?.publicId || "",
        },
      });
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = async (e) => {
    setApiLoading("started");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await imageService.upload(formData);
      const originalUrl = res.data.image.path;
      const resizing = "w_400,c_fill,g_auto";
      const [baseUrl, path] = originalUrl.split("/upload/");
      const newUrl = `${baseUrl}/upload/${resizing}/${path}`;

      setUserData((prev) => ({
        ...prev,
        profileImg: {
          url: newUrl,
          publicId: res.data.image.filename,
        },
      }));
    } catch (err) {
      console.error("Error uploading image", err);
    } finally {
      setApiLoading("completed");
      setImgLoading(true);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = await userService.put(user._id, userData);
      const { _id, name, email, profileImg } = updatedUser.data;
      setUser({ _id, name, email, profileImg });
      setOpenModal(false);
    } catch (err) {
      console.error("Error saving user data", err);
    } finally {
      setApiLoading("idle");
    }
  };

  const handleDeletePic = async () => {
    setApiLoading("started");
    try {
      await imageService.delete(userData.profileImg.publicId);
      const updatedInfo = {
        ...userData,
        profileImg: { url: "", publicId: "" },
      };
      const updatedUser = await userService.put(user._id, updatedInfo);
      const { _id, name, email, profileImg } = updatedUser.data;
      setUserData({ name, email, profileImg });
      setUser({ _id, name, email, profileImg });
      setOpenModal(false);
    } catch (err) {
      console.error("Error deleting image", err);
    } finally {
      setApiLoading("idle");
    }
  };

  const isUserDataChanged = !isEqual(
    {
      name: userData.name,
      email: userData.email,
    },
    { name: user.name, email: user.email }
  );

  const renderButtons = () => {
    if (apiLoading === "idle") {
      return (
        <>
          {!user.profileImg ? (
            <Button
              variant="contained"
              onClick={() => uploadFileRef.current.click()}
              startIcon={<AddAPhotoOutlinedIcon />}
            >
              Add profile picture
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => uploadFileRef.current.click()}
                startIcon={<ModeEditOutlineOutlinedIcon />}
              >
                Change
              </Button>
              <Button
                variant="outlined"
                onClick={handleDeletePic}
                startIcon={<DeleteOutlineOutlinedIcon />}
              >
                Remove
              </Button>
            </>
          )}
        </>
      );
    }
    if (apiLoading === "completed" && !imgLoading) {
      return (
        <>
          <Button variant="contained" onClick={handleSave}>
            Save as profile picture
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              const { profileImg } = user;
              setUserData((prev) => ({ ...prev, profileImg: profileImg }));
              setApiLoading("idle");
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <main className="user">
      <Modal openModal={openModal} closeModal={() => setOpenModal(false)}>
        {(apiLoading === "started" || imgLoading) && (
          <div className="img-loader"></div>
        )}
        <img
          key={Date.now()}
          src={userData.profileImg.url || placeholder}
          alt="profile picture"
          onError={(e) => (e.target.src = placeholder)}
          onLoad={() => setImgLoading(false)}
          onClick={() => uploadFileRef.current.click()}
        />

        <div className="user-buttons">{renderButtons()}</div>
      </Modal>
      <div onClick={() => setOpenModal(true)}>
        <IconButton>
          <img
            key={Date.now()}
            src={userData.profileImg.url || placeholder}
            alt="profile picture"
            onError={(e) => (e.target.src = placeholder)}
          />
        </IconButton>

        <div className="edit-icon-container">
          <EditIcon fontSize="small" />
        </div>
        <input
          type="file"
          ref={uploadFileRef}
          accept="image"
          onChange={handleUpload}
          onClick={(e) => (e.target.value = null)}
          style={{ display: "none" }}
        />
      </div>

      <TextField
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        value={userData.name}
        onChange={handleOnChange}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        value={userData.email}
        onChange={handleOnChange}
      />

      <Button
        variant="contained"
        disabled={!isUserDataChanged}
        onClick={handleSave}
      >
        Save
      </Button>
    </main>
  );
}

export default UserPage;
