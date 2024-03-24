import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Home from './components/Home';
import Matches from './components/Matches';
import Account from './components/Account';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css'; // Import the App.css file

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#222' }}> 
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#c5b358' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              ByteBuddies
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {isLoggedIn && <Button color="inherit" component={Link} to="/Matches">Matches</Button>}
          {!isLoggedIn ? (
            <Button color="inherit" component={Link} to="/Login">Login</Button>
          ) : (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar alt="User Profile" src="/UserProfile.jpg" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/Account">Account Details</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Matches" element={<Matches />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/SignUp" element={<SignUp onSignUp={() => setIsLoggedIn(true)} />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
