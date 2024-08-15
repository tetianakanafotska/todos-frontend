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

  function authenticateUser() {
    return new Promise((resolve, reject) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        authService
          .verify()
          .then((res) => {
            setTokenPayload(res.data);
            setIsLoggedIn(true);
            setIsLoading(false);
            resolve(); // Resolve the promise when the user is authenticated
          })
          .catch((error) => {
            if (error) {
              setAuthError(error.response.data.message);
              removeToken();
              setIsLoggedIn(false);
              setIsLoading(false);
              setTokenPayload(null);
              reject(error); // Reject the promise if there's an error
            }
          });
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setTokenPayload(null);
        resolve(); // Resolve immediately if no token is stored
      }
    });
  }

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = async () => {
    removeToken();
    await authenticateUser();
  };

  useEffect(() => {
    authenticateUser()
      .then(() => {})
      .catch((error) => {
        console.error("Authentication failed:", error);
      });
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
