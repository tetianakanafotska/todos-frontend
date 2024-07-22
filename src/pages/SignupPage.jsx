import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
        <TextField
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          value={data.name}
          onChange={handleOnChange}
          required
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={data.email}
          onChange={handleOnChange}
          required
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={data.password}
          onChange={handleOnChange}
          required
        />
        <p className="error-message">{errorMessage}</p>
        <Button variant="contained">Sign up</Button>
      </form>
    </main>
  );
}

export default SignupPage;
