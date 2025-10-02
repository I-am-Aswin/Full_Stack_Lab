import { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      onRegister(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="card w-96 bg-white/95 border border-gray-100 shadow-sm p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>
        {error && <div className="alert alert-error mb-2">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full mb-2 border-gray-200 focus:border-emerald-400 bg-white"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-2 border-gray-200 focus:border-emerald-400 bg-white"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4 border-gray-200 focus:border-emerald-400 bg-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-emerald-600 w-full bg-emerald-600 text-white border-none hover:bg-emerald-700 transition-colors" type="submit">Register</button>
      </form>
    </div>
  );
}
