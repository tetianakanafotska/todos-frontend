import { useContext } from "react";
import { AuthContext } from "@context/authContext.jsx";
import { Navigate } from "react-router-dom";
import { Loading } from "@components";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;
