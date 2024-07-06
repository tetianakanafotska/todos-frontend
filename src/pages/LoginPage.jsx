import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/authContext.jsx";
import authService from "@services/auth.service.js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        const errorDescription = error.response
          ? error.response.data.message
          : error.message;
        setErrorMessage("❌ " + errorDescription);
      });
  };

  return (
    <main className="login">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <label>
          Passwort
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <button>Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </main>
  );
}

export default LoginPage;
