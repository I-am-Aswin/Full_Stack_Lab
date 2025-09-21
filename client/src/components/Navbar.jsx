import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">MyPortfolio</Link>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-500">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-500">Edit Portfolio</Link>
            <button onClick={logoutHandler} className="bg-red-500 text-white px-3 py-1 rounded-md">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
