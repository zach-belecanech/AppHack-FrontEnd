import axios from 'axios';
import React, { useState } from 'react';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const enterUserName = (event) => {
    setUsername(event.target.value);
  }

  const enterPassword = (event) => {
    setPassword(event.target.value);
  }

  const submit = async (event) => {
    event.preventDefault();
    try {
        console.log(username);
        const response = await fetch('http://34.227.51.137:3000/getStudent/' + username);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        console.log(password);
        console.log(userData[0]['password']);
        console.log(userData[0]['password'] === password);
        
        if ((userData[0]['email'] === username) && (userData[0]['password'] === password)) {
            console.log('Login successful');
            setLoginStatus('success');
        } else {
            console.error('Invalid username or password');
            setLoginStatus('failure');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        setLoginStatus('failure');
    }
};

  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={enterUserName}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={enterPassword}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loginStatus === 'success' && <p>Login successful</p>}
      {loginStatus === 'failure' && <p>Login failed. Please check your username and password.</p>}
    </div>
  );
}

export default Login;