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
            <Layout>
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <IsPrivate>
                <UserPage />
              </IsPrivate>
            </Layout>
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
            <Layout>
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            </Layout>
          }
        />
        <Route
          path="/addTask/:taskType"
          element={
            <Layout>
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            </Layout>
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

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
