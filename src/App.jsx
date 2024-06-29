import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, Sidebar } from "./components";
import {
  Dashboard,
  About,
  ErrorPage,
  LoginPage,
  SignupPage,
  UserPage,
} from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="tasks/:taskId" element={<Dashboard />} />
        <Route path="/addTask" element={<Dashboard withAddTask={true} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* change later to user name */}
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
