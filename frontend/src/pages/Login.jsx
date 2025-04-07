import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import verifyUuid from "../services/admin";
import login from "../services/login";
import userService from "../utils/userService";

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uuidValid, setUuidValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { uuid } = useParams();

  // effect for validating the UUID on component mount
  useEffect(() => {
    console.log("uuid effect ran");
    verifyUuid(uuid)
      .then((response) => {
        console.log("uuid promise fulfilled");
        if (response.data.valid) setUuidValid(true);
      })
      .catch((error) => {
        console.log("uuid promise rejected");
        console.error("Invalid UUID", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uuid]);

  const handleLogin = (event) => {
    event.preventDefault();
    login({ username, password })
      .then((response) => {
        const adminUser = {
          username: response.data.username,
          token: response.data.token,
        };
        userService.save(adminUser);
        setUser(adminUser);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.error("Login failed", error));
  };

  if (isLoading) return <p>Loading...</p>;

  // Redirect to home if uuid not correct
  if (!uuidValid) return <Navigate to="/" replace />;

  // Redirect to admin panel if user is already logged in
  if (user && userService.exists()) {
    return <Navigate to="/administrate/panel" />;
  }

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
              value={username}
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
              value={password}
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
