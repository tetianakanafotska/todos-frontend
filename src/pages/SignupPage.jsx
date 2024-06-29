import React from "react";

function SignupPage() {
  return (
    <main className="login">
      <h1>Signup</h1>
      <label>
        Name
        <input type="text" />
      </label>
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

export default SignupPage;
