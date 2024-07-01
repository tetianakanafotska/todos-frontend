import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data", data);
    authService
      .signup(data)
      .then((createdUser) => {
        console.log(createdUser), navigate("/login");
      })
      .catch((err) => {
        console.error("Error while creating a user", err);
        const errorDescription = err.response.data.message
          ? err.response.data.message
          : err.request.statusText;
        setErrorMessage("❌ " + errorDescription);
      });
  };

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="login">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Passwort
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </label>
        <p className="error-message">{errorMessage}</p>
        <button>Sign up</button>
      </form>
    </main>
  );
}

export default SignupPage;
