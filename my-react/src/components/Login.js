import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useDataStore } from '../store';


export const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const { setid } = useDataStore();
  const navigate = useNavigate(); 

  const enterUserName = (event) => {
    setUsername(event.target.value);
  };

  const enterPassword = (event) => {
    setPassword(event.target.value);
  };

  

  const submit = async (event) => {
    event.preventDefault();
    try {
        console.log(username);
        const response = await fetch('http://34.227.51.137:3000/getStudent/' + username);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        
        if ((userData[0]['email'] === username) && (userData[0]['password'] === password)) {
          console.log('Login successful');
          setid(userData[0]['student_id'])
          setLoginStatus('success');
          onLoginSuccess();  
          navigate('/Matches', { state: userData }); 
        } else {
          console.error('Invalid username or password');
          setLoginStatus('failure');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        setLoginStatus('failure');
    }
};

const GoogleLogin = () => {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '380199076903-98dqfjah24m3frpca09o53fghapng3v7.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

    const handleCredentialResponse = (response) => {
      console.log('ID Token:', response.credential);
      // Use the ID token to authenticate the user on your backend
    };
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={enterUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={enterPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <div id="googleSignInButton">
            <GoogleLogin />
          </div>
          {loginStatus === 'success' && <Alert severity="success">Login successful</Alert>}
          {loginStatus === 'failure' && <Alert severity="error">Login failed. Please check your username and password.</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
