import React, { useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function UserModal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <IconButton className="close-icon" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      {children}
    </dialog>
  );
}

export default UserModal;
