import { useEffect } from "react";

function useOutsideClick(ref, handleClickOutside) {
  useEffect(() => {
    const handleClick = (event) => {
      //console.log("this is what was clicked", event.target);
      //console.log("gets closed", !ref.current.contains(event.target));
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
