import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({ user }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [''],
    category: '',
    location: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/products', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/my-ads');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post ad');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Post an Ad</h2>
        {error && <div className="alert alert-error mb-2 py-1 text-xs">{error}</div>}
        <input className="input input-bordered mb-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea className="textarea textarea-bordered mb-2" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input className="input input-bordered mb-2" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input className="input input-bordered mb-2" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input className="input input-bordered mb-2" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input className="input input-bordered mb-4" name="images" placeholder="Image URL (optional)" value={form.images[0]} onChange={e => setForm(f => ({ ...f, images: [e.target.value] }))} />
        <button className="btn btn-primary bg-[var(--accent)] border-none text-white">Post Ad</button>
      </form>
    </div>
  );
}
