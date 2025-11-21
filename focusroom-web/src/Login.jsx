import { useState } from "react";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    onLogin({
      name: name.trim(),
      code: code.trim() || null,
    });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>FocusRoom</h1>
        <p>Sign in to join your rooms.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Name
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Class / Team code (optional)
            <input
              type="text"
              placeholder="e.g. SOEN357-A"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
