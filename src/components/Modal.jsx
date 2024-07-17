import React, { useRef, useEffect } from "react";

function Modal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    console.log(openModal);
    if (openModal) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <h1>Profile picture</h1>
      {children}
    </dialog>
  );
}

export default Modal;
