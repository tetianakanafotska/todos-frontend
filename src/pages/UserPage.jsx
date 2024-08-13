import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@context/userContext";
import userService from "@services/user.service.js";
import imageService from "@services/image.service";
import isEqual from "lodash/isEqual";
import UserModal from "../components/UserModal";
import Avatar from "@mui/material/Avatar";

import { IconButton, TextField, Button, Box } from "@mui/material";

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

  const renderImageOrAvatar = () => {
    return (
      <>
        {userData.profileImg.url && !imgLoading && (
          <IconButton sx={{ margin: "10px 0 25px" }}>
            <img
              key={Date.now()}
              src={userData.profileImg.url}
              alt="profile picture"
              style={{ width: 200, height: 200, borderRadius: "50%" }}
            />
          </IconButton>
        )}
        {(!userData.profileImg.url || imgLoading) && (
          <IconButton sx={{ margin: "10px 0 25px" }}>
            <Avatar
              className="avatar"
              sx={{
                bgcolor: "tags.medium.main",
                color: "black.light",
              }}
            >
              {user.name[0]}
            </Avatar>
          </IconButton>
        )}
      </>
    );
  };

  return (
    <Box className="user" component="main">
      <Box
        className="form-container"
        sx={{
          width: {
            xs: "90%",
            sm: "60%",
            md: "40%",
            lg: "30%",
          },
        }}
      >
        <UserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          apiLoading={apiLoading}
          setApiLoading={setApiLoading}
          imgLoading={imgLoading}
          setImgLoading={setImgLoading}
          uploadFileRef={uploadFileRef}
          handleDeletePic={handleDeletePic}
          handleSave={handleSave}
          userData={userData}
          setUserData={setUserData}
        ></UserModal>

        <Box onClick={() => setOpenModal(true)}>
          {renderImageOrAvatar()}
          <input
            type="file"
            ref={uploadFileRef}
            accept="image/*"
            onChange={handleUpload}
            onClick={(e) => (e.target.value = null)}
            style={{ display: "none" }}
          />
        </Box>

        <TextField
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          value={userData.name}
          onChange={handleOnChange}
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={userData.email}
          onChange={handleOnChange}
          fullWidth
        />

        <Button
          fullWidth
          variant="contained"
          disabled={!isUserDataChanged}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default UserPage;
