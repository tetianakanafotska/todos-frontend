import { useRef, useEffect } from "react";

function useOutsideClick(ref, handleClickOutside) {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}

export default useOutsideClick;
