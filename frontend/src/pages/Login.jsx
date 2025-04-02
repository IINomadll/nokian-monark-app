import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Login Info</legend>
          <p>
            <label htmlFor="userName">username:</label>
            <input
              type="text"
              name="userName"
              id="userName"
              autoComplete="on"
              required
              onChange={({ target }) => setUsername(target.value)}
            />
          </p>
          <p>
            <label htmlFor="password">password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </p>
        </fieldset>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
