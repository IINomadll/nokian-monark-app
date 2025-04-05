import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import verifyUuid from "../services/admin";
import login from "../services/login";

const Login = ({ adminAccess, setAdminAccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { uuid } = useParams();

  console.log(uuid);
  console.log(adminAccess);

  useEffect(() => {
    console.log("login effect ran");
    verifyUuid(uuid)
      .then((response) => {
        console.log("login promise fulfilled");
        console.log(response);
        setIsLoading(false);
        if (response.data.valid) setAdminAccess(true);
      })
      .catch((error) => {
        console.log("login promise rejected");
        console.error(error);
        setIsLoading(false);
      });
  }, [uuid, setAdminAccess]);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    login({ username, password })
      .then((response) => {
        console.log("RESPONSE", response);
        console.log("DATA", response.data);
        setUsername("");
        setPassword("");
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  };

  if (isLoading) return <p>Loading...</p>;
  else if (!isLoading && !adminAccess) return <Navigate to="/" />;
  else if (!isLoading && !user) {
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
  } else {
    return (
      <p>
        <em>{user.username} logged in!</em>
      </p>
    );
  }
};

export default Login;
