import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-8 w-full max-w-sm">
  <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Login</h2>
        {error && <div className="alert alert-error mb-2 py-1 text-xs">{error}</div>}
        <input className="input input-bordered mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="input input-bordered mb-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-accent bg-[var(--accent)] border-none text-white">Login</button>
        <div className="text-xs mt-2">Don't have an account? <a href="/register" className="text-[var(--accent)]">Register</a></div>
      </form>
    </div>
  );
}
