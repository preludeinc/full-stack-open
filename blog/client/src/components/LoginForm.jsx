const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <span>username </span>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <span>password </span>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
          <div>
            <button type="submit">login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
