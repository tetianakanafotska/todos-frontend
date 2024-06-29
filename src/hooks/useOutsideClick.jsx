import { useEffect } from "react";

function useOutsideClick(ref, handleClickOutside) {
  useEffect(() => {
    const handleClick = (event) => {
      console.log("e.target", event.target);
      console.log("ref.current", ref.current);
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  });
}

export default useOutsideClick;
