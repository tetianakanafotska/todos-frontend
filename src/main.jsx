import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "@context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </BrowserRouter>
);
