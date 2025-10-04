
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (location) params.append('location', location);
    const res = await axios.get(`/api/products?${params.toString()}`);
    setProducts(res.data);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <input
            className="input input-bordered flex-1"
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-accent bg-[var(--accent)] border-none text-white">Search</button>
        </form>
        <div className="flex gap-2">
          <input
            className="input input-bordered"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <input
            className="input input-bordered"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.length === 0 && (
          <div className="col-span-full text-center text-base-content/60 py-12">No products found.</div>
        )}
        {products.map(product => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
}
