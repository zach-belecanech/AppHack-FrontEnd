import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from './components/Home'
import Account from './components/Account'
import Matches from './components/Matches'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/matches">Matches</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;