import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from './App.css';
import Home from './components/Home'
import Matches from './components/Matches'
import Account from './components/Account'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <div class='All'>
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
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/SignUp">Sign Up Here!</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeP />} />
          <Route path="/Matches" element={<MatchesP />} />
          <Route path="/Account" element={<AccountP />} />
          <Route path="/SignUp" element={<SignUpP />} />
          <Route path="/Login" element={<LoginP />} />
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

function SignUpP() {
  return <SignUp />;
}

function LoginP() {
  return <Login />;
}

export default App;
