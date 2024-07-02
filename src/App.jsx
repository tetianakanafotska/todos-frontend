import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, Sidebar, IsPrivate, IsAnon } from "@components";
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
        <Route path="/addTask" element={<Dashboard withAddTask={true} />} />
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
          path="/user"
          element={
            <IsPrivate>
              <UserPage />
            </IsPrivate>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
