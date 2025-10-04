import { Link } from 'react-router-dom';


export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar bg-base-100 shadow-sm border-b border-base-200">
      <div className="flex-1">
        <Link to="/" className="font-bold text-2xl tracking-tight text-[var(--accent)]">ClassiFind</Link>
      </div>
      <div className="flex-none flex items-center gap-2">
        <ul className="menu menu-horizontal px-1 text-base font-medium">
          <li><Link to="/products" className="hover:text-[var(--accent)]">Products</Link></li>
          <li><Link to="/sell" className="hover:text-[var(--accent)]">Sell</Link></li>
          {user && <li><Link to="/my-ads" className="hover:text-[var(--accent)]">My Ads</Link></li>}
          {user && <li><Link to="/chat" className="hover:text-[var(--accent)]">Chat</Link></li>}
        </ul>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] font-semibold">
                {user.name[0]}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-44">
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm text-base-content hover:text-[var(--accent)]">Login</Link>
            <Link to="/register" className="btn btn-sm bg-[var(--accent)] border-none text-white hover:brightness-110">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
