import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from './App.css';
import Home from './components/Home'
import Matches from './components/Matches'
import Account from './components/Account'

function App() {
  return (
    <Router>
      <div>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Matches">Matches</Link>
            </li>
            <li>
              <Link to="/Account">Account</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeP />} />
          <Route path="/Matches" element={<MatchesP />} />
          <Route path="/Account" element={<AccountP />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomeP() {
  return <Home />;
}

function MatchesP() {
  return <Matches />;
}

function AccountP() {
  return <Account />;
}

export default App;
