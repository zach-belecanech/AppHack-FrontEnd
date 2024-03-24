import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Home from './components/Home';
import Matches from './components/Matches';
import Account from './components/Account';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: '#222' }}> 
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#c5b358' }}>
      ByteBuddies
    </Typography>
    <Button color="inherit" component={Link} to="/" style={{ color: '#c5b358' }}>Home</Button>
    {isLoggedIn && <Button color="inherit" component={Link} to="/Matches" style={{ color: '#c5b358' }}>Matches</Button>}
    {isLoggedIn ? (
      <Button color="inherit" component={Link} to="/Account" style={{ color: '#c5b358' }}>Account</Button>
    ) : (
      <>
        <Button color="inherit" component={Link} to="/Login" style={{ color: '#c5b358' }}>Login</Button>
        <Button color="inherit" component={Link} to="/SignUp" style={{ color: '#c5b358' }}>Sign Up</Button>
      </>
    )}
  </Toolbar>
</AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Matches" element={<Matches />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/SignUp" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/Login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
}

export default App;
