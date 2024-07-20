import React, { useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

function Modal({ openModal, closeModal, children }) {
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
      <CloseIcon className="close-icon" onClick={closeModal} />
      {children}
    </dialog>
  );
}

export default Modal;
