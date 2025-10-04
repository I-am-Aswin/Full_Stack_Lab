import { Link } from 'react-router-dom';


export default function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition border border-base-200 rounded-xl overflow-hidden">
      <figure className="bg-base-200 h-44 flex items-center justify-center">
        <img src={product.images?.[0] || '/vite.svg'} alt={product.title} className="object-contain h-36" />
      </figure>
      <div className="card-body pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] font-bold text-sm">
            {product.seller?.name ? product.seller.name[0] : '?'}
          </div>
          <span className="text-xs text-base-content/60">{product.seller?.name || 'Seller'}</span>
        </div>
        <h2 className="card-title text-base-content font-semibold mb-1">{product.title}</h2>
        <p className="text-xs text-base-content/70 mb-2">{product.description.slice(0, 60)}...</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-[var(--accent)] text-lg">₹{product.price}</span>
          <Link to={`/products/${product._id}`} className="btn btn-sm btn-outline border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">View</Link>
        </div>
      </div>
    </div>
  );
}
