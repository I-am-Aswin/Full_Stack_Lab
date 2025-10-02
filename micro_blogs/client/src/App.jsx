
import { useState } from 'react';
import jwt_decode from './utils/jwt-decode';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

import Users from './pages/Users';

function App() {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwt_decode(token);
      return { id: decoded.id, ...decoded };
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => setUser(user);
  const handleRegister = (user) => setUser(user);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onRegister={handleRegister} />} />
        <Route path="/profile/:id" element={user ? <Profile userId={user.id} /> : <Navigate to="/login" />} />
        <Route path="/users" element={user ? <Users userId={user.id} /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Feed user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
