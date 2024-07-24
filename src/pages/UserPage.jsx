import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@context/userContext";
import placeholder from "@/assets/placeholder.jpg";
import EditIcon from "@mui/icons-material/Edit";
import userService from "@services/user.service.js";
import imageService from "@services/image.service";
import isEqual from "lodash/isEqual";
import Modal from "../components/Modal";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";

function UserPage() {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileImg: { url: "", publicId: "" },
  });
  const [loading, setLoading] = useState("idle");
  const [openModal, setOpenModal] = useState(false);
  const uploadFileRef = useRef();

  useEffect(() => {
    if (user) {
      const { name, email, profileImg } = user;
      setUserData({
        name,
        email,
        profileImg: {
          url: profileImg.url || placeholder,
          publicId: profileImg.publicId || "",
        },
      });
    }
  }, [user]);

  const handleOnChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpload = (e) => {
    setLoading("started");
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
        setUserData((prev) => ({
          ...prev,
          profileImg: {
            url: newUrl,
            publicId: res.data.image.filename,
          },
        }));
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        setLoading("completed");
      });
  };

  const handleSave = async () => {
    const updatedUser = await userService.put(user._id, userData);
    const { _id, name, email, profileImg } = updatedUser.data;
    setUser({ _id, name, email, profileImg });
    setOpenModal(false);
    setLoading("idle");
  };

  const handleDeletePic = async () => {
    setLoading("started");
    try {
      await imageService.delete(userData.profileImg.publicId);
      const updatedInfo = {
        ...userData,
        profileImg: { url: "", publicId: "" },
      };
      const updatedUser = await userService.put(user._id, updatedInfo);
      const { _id, name, email, profileImg } = updatedUser.data;
      setUser({ _id, name, email, profileImg });
      setOpenModal(false);
      setLoading("idle");
    } catch (err) {
      console.error("Error deleting image", err);
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
    switch (loading) {
      case "idle":
        return (
          <>
            {!user.profileImg.url && (
              <Button
                variant="contained"
                onClick={() => uploadFileRef.current.click()}
                startIcon={<AddAPhotoOutlinedIcon />}
              >
                Add profile picture
              </Button>
            )}
            {user.profileImg.url && (
              <Button
                variant="contained"
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={() => uploadFileRef.current.click()}
              >
                Change
              </Button>
            )}
            {user.profileImg.url && (
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={handleDeletePic}
              >
                Remove
              </Button>
            )}
          </>
        );
      case "completed":
        return (
          <>
            <Button variant="contained" onClick={handleSave}>
              Save as profile picture
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  profileImg: { url: "", publicId: "" },
                }));
                setLoading("idle");
                setOpenModal(false);
              }}
            >
              Cancel
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="user">
      <Modal openModal={openModal} closeModal={() => setOpenModal(false)}>
        {loading === "started" && <div className="img-loader"></div>}
        <img
          src={userData.profileImg.url}
          alt="profile picture"
          //style={{ display: loading === "started" ? "none" : "block" }}
        />

        <div className="user-buttons">{renderButtons()}</div>
      </Modal>
      <div onClick={() => setOpenModal(true)}>
        <IconButton>
          <img
            src={userData.profileImg.url}
            alt="profile picture"
            // onLoad={handleImageLoad}
            // onError={handleImageError}
            //style={{ display: loading === "started" ? "none" : "block" }}
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
