import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Account } from './pages/Account';
import { Home } from './pages/Home';

function App() {

  const token = Cookies.get('token');

  console.log(token);

  return (
    <Router>
      <Routes>
        {/* Default route: Redirect based on token */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        
        {/* Define the routes for the application */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Account />} />
        
        {/* Optionally, handle other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
