import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "@context/authContext.jsx";
import { UserProviderWrapper } from "@context/userContext.jsx";
import MuiTheme from "@context/muiTheme.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TaskProvider } from "@context/taskContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProviderWrapper>
      <UserProviderWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiTheme>
            <TaskProvider>
              <App />
            </TaskProvider>
          </MuiTheme>
        </LocalizationProvider>
      </UserProviderWrapper>
    </AuthProviderWrapper>
  </BrowserRouter>
);
