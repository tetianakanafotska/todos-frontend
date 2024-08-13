import { Routes, Route } from "react-router-dom";
import "./App.sass";
import { Layout, IsPrivate, IsAnon } from "@components";
import {
  Dashboard,
  About,
  ErrorPage,
  LoginPage,
  SignupPage,
  UserPage,
} from "@pages";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <Layout>
                <Dashboard />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            <IsPrivate>
              <Layout>
                <Dashboard />
              </Layout>
            </IsPrivate>
          }
        />
        <Route
          path="/addTask/:taskType"
          element={
            <IsPrivate>
              <Layout>
                <Dashboard />
              </Layout>
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
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Layout>
                <UserPage />
              </Layout>
            </IsPrivate>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
