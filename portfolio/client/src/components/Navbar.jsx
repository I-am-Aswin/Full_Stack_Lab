import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (isLoading) {
        return (
            <nav className="w-full bg-gradient-to-r from-primary/10 via-base-100/90 to-secondary/10 backdrop-blur-md border-b border-primary/20 shadow-lg px-8 py-4 text-md flex items-center justify-between fixed top-0 z-50">
                <div className="w-1/4"></div>
                <ul className="w-2/5 flex items-center justify-evenly gap-8">
                    <li><a href="#about" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200">About</a></li>
                    <li><a href="#skills" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200">Skills</a></li>
                    <li><a href="#projects" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200">Projects</a></li>
                    <li><a href="#contact" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200">Contact</a></li>
                </ul>
                <div className="w-1/4 flex justify-end">
                    <div className="loading loading-spinner loading-sm text-primary"></div>
                </div>
            </nav>
        );
    }

    return ( 
        <nav className="w-full bg-gradient-to-r from-primary/10 via-base-100/90 to-secondary/10 backdrop-blur-md border-b border-primary/20 shadow-lg px-8 py-4 text-md flex items-center justify-between fixed top-0 z-50">
            {/* Left side - Logo/Brand */}
            <div className="w-1/4">
                <a href="#landing" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">
                    Portfolio
                </a>
            </div>
            
            {/* Center - Navigation links */}
            <ul className="w-2/5 flex items-center justify-evenly gap-8">
                <li><a href="#about" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-primary/10">About</a></li>
                <li><a href="#skills" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-primary/10">Skills</a></li>
                <li><a href="#projects" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-primary/10">Projects</a></li>
                <li><a href="#contact" className="text-base-content/80 hover:text-primary hover:font-semibold inline-block transform hover:scale-105 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-primary/10">Contact</a></li>
            </ul>
            
            {/* Right side - Login/Register buttons or User info/Logout */}
            <div className="flex gap-3 w-1/4 justify-end items-center">
                {isAuthenticated ? (
                    <>
                        <span className="text-base-content/80 text-sm bg-base-200/50 px-3 py-1 rounded-full">
                            Welcome, {user?.name}
                        </span>
                        <button 
                            onClick={handleLogout}
                            className="btn btn-outline btn-error btn-sm hover:bg-error hover:text-error-content transition-all duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-outline btn-primary btn-sm hover:bg-primary hover:text-primary-content transition-all duration-200">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm hover:bg-primary/90 transition-all duration-200">Register</Link>
                    </>
                )}
            </div>
        </nav>
     );
}
 
export default Navbar;