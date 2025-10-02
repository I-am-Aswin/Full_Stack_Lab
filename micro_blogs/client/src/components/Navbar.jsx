import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
  <div className="navbar bg-white/95 border-b border-gray-100 shadow-sm mb-6 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center px-2 sm:px-0">
  <Link to="/" className="text-xl font-extrabold tracking-tight text-emerald-600">MicroBlogs</Link>
        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <Link to="/users" className="btn btn-ghost text-emerald-600 hover:bg-emerald-50">Users</Link>
              <Link to={`/profile/${user.id}`} className="btn btn-ghost text-emerald-600 hover:bg-emerald-50">Profile</Link>
              <button className="btn btn-ghost text-red-500 hover:bg-red-50" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost text-emerald-600 hover:bg-emerald-50">Login</Link>
              <Link to="/register" className="btn bg-emerald-600 text-white font-semibold shadow-none border-none hover:bg-emerald-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
