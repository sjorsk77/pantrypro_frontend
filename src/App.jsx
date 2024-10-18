import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Account } from './pages/Account';
import { Home } from './pages/Home';
import { Pantries } from './pages/Pantries';
import { Diets } from './pages/Diets';

function App() {

  const token = Cookies.get('token');
  return (
    <Router>
      <Routes>
        {/* Default route: Redirect based on token */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Account />} />
        <Route path="/pantry" element={<Pantries />} />
          <Route path="/diet" element={<Diets />} />

        
        {/* Optionally, handle other routes here */}
      </Routes>

    </Router>

  );
}

export default App;
