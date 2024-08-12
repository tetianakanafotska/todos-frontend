import React, { useState, useEffect } from "react";
import authService from "@services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenPayload, setTokenPayload] = useState(null);
  const [authError, setAuthError] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify()
        .then((res) => {
          setIsLoggedIn(true);
          setIsLoading(false);
          setTokenPayload(res.data);
        })
        .catch((error) => {
          if (error) {
            setAuthError(error.response.data.message);
            removeToken();
            setIsLoggedIn(false);
            setIsLoading(false);
            setTokenPayload(null);
            return;
          }
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setTokenPayload(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        tokenPayload,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
