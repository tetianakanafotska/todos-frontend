import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@context/authContext.jsx";
import { Loading } from "@components";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    console.log("user logged in, returnign children");
    return children;
  }
}

export default IsPrivate;
