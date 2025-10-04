import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/sell', label: 'Sell', icon: '➕' },
  { to: '/my-ads', label: 'My Ads', icon: '📦' },
  { to: '/messages', label: 'Messages', icon: '💬' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export default function MainLayout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className={`fixed z-30 md:static md:w-56 w-64 bg-base-100 shadow-lg h-full flex flex-col transition-transform ${sidebarOpen ? '' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-base-300">
          <span className="font-bold text-xl text-[var(--accent)]">ClassiFind</span>
          <button className="md:hidden btn btn-ghost btn-sm" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <nav className="flex-1 px-2 py-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 font-medium transition ${location.pathname === link.to ? 'bg-[var(--accent-light)] text-[var(--accent)]' : 'hover:bg-base-300'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span>{link.icon}</span> {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 pb-4">
          {user ? (
            <button className="btn btn-outline w-full" onClick={onLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost w-full mb-2">Login</Link>
              <Link to="/register" className="btn btn-primary w-full bg-[var(--accent)] border-none text-white">Register</Link>
            </>
          )}
        </div>
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-10">
          <button className="md:hidden btn btn-ghost btn-sm" onClick={() => setSidebarOpen(true)}>☰</button>
          <form className="flex-1 max-w-lg mx-4">
            <input className="input input-bordered w-full" placeholder="Search products..." />
          </form>
          {user && (
            <Link to="/profile" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 h-9 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] font-semibold">
                {user.name[0]}
              </div>
            </Link>
          )}
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
