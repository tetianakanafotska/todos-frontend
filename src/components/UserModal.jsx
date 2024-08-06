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
  setUserData,
  imgLoading,
  setImgLoading,
  uploadFileRef,
  handleDeletePic,
  handleSave,
  userData,
}) {
  const { user } = useContext(UserContext);

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
        <Box
          sx={{
            margin: "10px 0",
            padding: "20px 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {(apiLoading === "started" || imgLoading) && (
            <CircularProgress
              size={220}
              thickness={2}
              sx={{ position: "absolute", top: "40px" }}
            />
          )}
          {userData.profileImg.url ? (
            <img
              key={Date.now()}
              src={userData.profileImg.url}
              alt="profile picture"
              onLoad={() => setImgLoading(false)}
              onClick={() => uploadFileRef.current.click()}
            />
          ) : (
            <Avatar
              sx={{
                width: 200,
                height: 200,
                bgcolor: "tags.medium",
                color: "black.light",
                fontSize: "2rem",
              }}
            >
              {userData.name[0]}
            </Avatar>
          )}
        </Box>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          {renderButtons()}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default UserModal;
