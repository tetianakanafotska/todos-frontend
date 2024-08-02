import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar, IsPrivate, IsAnon } from "@components";
import {
  Dashboard,
  About,
  ErrorPage,
  LoginPage,
  SignupPage,
  UserPage,
} from "@pages";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="tasks/:taskId"
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />
        <Route
          path="/addTask"
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        {/* change later to user name */}
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserPage />
            </IsPrivate>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
