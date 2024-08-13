import React, { useContext } from "react";
import { UserContext } from "@context/userContext";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";

function UserModal({
  openModal,
  setOpenModal,
  apiLoading,
  setApiLoading,
  userData,
  setUserData,
  imgLoading,
  setImgLoading,
  uploadFileRef,
  handleDeletePic,
  handleSave,
}) {
  const { user } = useContext(UserContext);

  const renderImageOrAvatar = () => {
    return (
      <>
        {apiLoading === "idle" && (
          <Avatar
            className="avatar"
            sx={{
              bgcolor: "tags.medium.main",
              color: "black.light",
            }}
          >
            {userData.name[0]}
          </Avatar>
        )}

        {(apiLoading === "started" || imgLoading) && (
          <>
            <CircularProgress
              size={208}
              thickness={1}
              sx={{ position: "absolute", top: "46px" }}
            />
            <Avatar
              className="avatar"
              sx={{
                bgcolor: "tags.medium.main",
                color: "black.light",
              }}
            >
              {userData.name[0]}
            </Avatar>
          </>
        )}

        {apiLoading === "completed" && (
          <img
            key={Date.now()}
            src={userData.profileImg.url}
            alt="profile picture"
            onLoad={() => setImgLoading(false)}
            onClick={() => uploadFileRef.current.click()}
            style={{ display: `${imgLoading ? "none" : "block"}` }}
          />
        )}
      </>
    );
  };

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
                startIcon={
                  <ModeEditOutlineOutlinedIcon
                    sx={{ fontSize: "18px !important" }}
                  />
                }
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
    <Dialog
      className="user"
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <IconButton
        sx={{ position: "absolute", right: "5px", top: "5px" }}
        onClick={() => setOpenModal(false)}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box className="pic-container">{renderImageOrAvatar()}</Box>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          {renderButtons()}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default UserModal;
