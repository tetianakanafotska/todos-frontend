import React from "react";

function LoginPage() {
  return (
    <main className="login">
      <h1>Login</h1>
      <label>
        Email
        <input type="email" />
      </label>
      <label>
        Passwort
        <input type="password" />
      </label>
    </main>
  );
}

export default LoginPage;
