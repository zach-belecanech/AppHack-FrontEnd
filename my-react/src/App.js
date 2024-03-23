import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from './App.css';

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
          <Route path="/" element={<Home />} />
          <Route path="/Matches" element={<Matches />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function Matches() {
  return <h2>Matches Page</h2>;
}

function Account() {
  return <h2>Account Page</h2>;
}

export default App;
