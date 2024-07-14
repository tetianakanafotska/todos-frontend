import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "@context/authContext.jsx";
import { UserProviderWrapper } from "@context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProviderWrapper>
      <UserProviderWrapper>
        <App />
      </UserProviderWrapper>
    </AuthProviderWrapper>
  </BrowserRouter>
);
