import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Account } from './pages/Account';
import { Home } from './pages/Home';
import { Pantries } from './pages/Pantries';
import { Diets } from './pages/Diets';
import Cookbook from "./pages/Cookbook";
import RecipeBrowser from "./pages/RecipeBrowser";
import AdminPage from "./pages/Admin";

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
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/recipe" element={<RecipeBrowser/>}/>
        <Route path="/admin" element={<AdminPage/>}/>

        
        {/* Optionally, handle other routes here */}
      </Routes>

    </Router>

  );
}

export default App;
