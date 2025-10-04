import { useParams } from 'react-router-dom';

export default function Checkout() {
  const { id } = useParams();
  // Placeholder for payment UI
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="card bg-base-100 shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[var(--accent-dark)]">Checkout</h2>
        <div className="mb-4">Payment integration coming soon for product ID: <span className="font-mono">{id}</span></div>
        <button className="btn btn-accent bg-[var(--accent)] border-none text-white">Pay Now</button>
      </div>
    </div>
  );
}
