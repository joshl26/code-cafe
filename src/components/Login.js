/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-component">
      <h2>Log In</h2>
      <form>
        <div>
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
