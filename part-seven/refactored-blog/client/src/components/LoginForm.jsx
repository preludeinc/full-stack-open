import PropTypes from "prop-types";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUpdate = (event) => {
    const { name, value } = event.target;

    if (name === "Username") {
      setUsername(value);
    } else if (name === "Password") {
      setPassword(value);
    }
  };

  const login = (event) => {
    event.preventDefault();

    const loginInfo = {
      username,
      password,
    };
    handleLogin(loginInfo);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={login}>
        <div>
          <span>username </span>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleLoginUpdate}
          />
        </div>
        <div>
          <span>password </span>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handleLoginUpdate}
          />
          <div>
            <button type="submit">login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
