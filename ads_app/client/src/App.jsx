
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Chat from './pages/Chat';
import Checkout from './pages/Checkout';
import MyAds from './pages/MyAds';
import ProductForm from './pages/ProductForm';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';

function getUserFromToken() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.id, isSeller: payload.isSeller, name: payload.name || 'User' };
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails user={user} />} />
          <Route path="/sell" element={<ProductForm user={user} />} />
          <Route path="/my-ads" element={<MyAds user={user} />} />
          <Route path="/messages" element={<Messages user={user} />} />
          <Route path="/chat/:id" element={<Chat user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/profile/:id" element={<Profile user={user} />} />
          <Route path="/checkout/:id" element={<Checkout user={user} />} />
        </Route>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  );
}
