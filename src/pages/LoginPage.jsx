import React from "react";

function LoginPage() {
  return (
    <main className="login">
      <h1>Login</h1>
      <form action="">
        <label>
          Email
          <input type="email" />
        </label>
        <label>
          Passwort
          <input type="password" />
        </label>
        <button>Login</button>
      </form>
    </main>
  );
}

export default LoginPage;
