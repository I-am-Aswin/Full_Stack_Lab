import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', isSeller: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-8 w-full max-w-sm">
  <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Register</h2>
        {error && <div className="alert alert-error mb-2 py-1 text-xs">{error}</div>}
        <input className="input input-bordered mb-2" placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
        <input className="input input-bordered mb-2" placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
        <input className="input input-bordered mb-2" type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
        <label className="label cursor-pointer mb-4">
          <span className="label-text">Register as Seller?</span>
          <input type="checkbox" className="checkbox checkbox-accent ml-2" name="isSeller" checked={form.isSeller} onChange={handleChange} />
        </label>
        <button className="btn btn-accent bg-[var(--accent)] border-none text-white">Register</button>
        <div className="text-xs mt-2">Already have an account? <a href="/login" className="text-[var(--accent)]">Login</a></div>
      </form>
    </div>
  );
}
