import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

function UserModal({ openModal, setOpenModal, children, renderButtons }) {
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
        {children}
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          {renderButtons()}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default UserModal;
