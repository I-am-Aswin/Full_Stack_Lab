import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails({ user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Product not found'));
  }, [id]);

  if (error) return <div className="text-center mt-10 text-error">{error}</div>;
  if (!product) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <img src={product.images?.[0] || '/vite.svg'} alt={product.title} className="w-full md:w-80 h-64 object-contain bg-base-200 rounded" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-base-content mb-2">{product.title}</h2>
          <div className="text-lg font-semibold text-[var(--accent)] mb-2">₹{product.price}</div>
          <div className="mb-2 text-base-content/80">{product.description}</div>
          <div className="mb-2 text-sm">Category: <span className="badge badge-outline">{product.category}</span></div>
          <div className="mb-2 text-sm">Location: <span className="badge badge-outline">{product.location}</span></div>
          <div className="mb-2 text-sm flex items-center gap-2">
            Seller: <span className="font-semibold">{product.seller?.name}</span>
            {product.seller?._id && (
              <button className="btn btn-xs btn-outline border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white ml-2" onClick={() => navigate(`/profile/${product.seller._id}`)}>View Seller Profile</button>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            {user && user.id !== product.seller?._id && (
              <button className="btn btn-outline border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white" onClick={() => navigate(`/chat?product=${product._id}&to=${product.seller?._id}`)}>Chat with Seller</button>
            )}
            {user && user.id === product.seller?._id && (
              <span className="badge badge-outline">This is your product</span>
            )}
            <button className="btn btn-primary" onClick={() => navigate(`/checkout/${product._id}`)}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
