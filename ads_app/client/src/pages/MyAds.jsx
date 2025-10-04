import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

export default function MyAds({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios.get('/api/products').then(res => {
      setProducts(res.data.filter(p => p.seller?._id === user.id));
    });
  }, [user]);

  if (!user) return <div className="text-center mt-10">Please login to view your ads.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-[var(--accent-dark)]">My Ads</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
}
