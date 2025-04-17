import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import verifyUuid from "../services/admin";
import login from "../services/login";
import userService from "../utils/userService";

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uuidValid, setUuidValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { uuid } = useParams();

  // effect for validating the UUID on component mount
  useEffect(() => {
    console.log("uuid effect ran");
    verifyUuid(uuid)
      .then((response) => {
        console.log("uuid promise fulfilled");
        if (response.data.valid) {
          setUuidValid(true);
          toast.success("UUID valid, access granted!");
        }
      })
      .catch((error) => {
        console.log("uuid promise rejected");
        console.error("invalid UUID", error);
        toast.warning("UUID invalid, access denied!");
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
        toast.success(`Logged in as ${adminUser.username}!`);
      })
      .catch((error) => {
        console.error("Login failed", error);
        setError("Invalid username or password");
        setUsername("");
        setPassword("");
        toast.error("Login failed, check credentials!");
      });
  };

  // render Loading... while UUID validity is checked
  if (isLoading)
    // announces loading state to AT users automatically.
    return (
      <p role="status" aria-live="polite">
        Loading...
      </p>
    );

  // Redirect to home if uuid not correct
  if (!uuidValid) return <Navigate to="/" replace />;

  // Redirect to admin panel if user is already logged in
  if (user && userService.exists()) {
    return <Navigate to="/administrate/panel" />;
  }

  return (
    <main>
      <article className="login-page">
        <header>
          <h1>Login</h1>
        </header>

        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Login Info</legend>

            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}

            <div className="form-field">
              <label htmlFor="userName">Username:</label>
              <br />
              <input
                type="text"
                name="userName"
                id="userName"
                autoComplete="on"
                required
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </article>
    </main>
  );
};

export default Login;
