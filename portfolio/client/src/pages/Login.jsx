import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            setMessage('Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setMessage(result.error);
        }
        
        setIsLoading(false);
    };

    return ( 
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/10 flex items-center justify-center py-20">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">Welcome Back</h1>
                    <p className="text-base-content/70">Sign in to your account to continue</p>
                </div>
                
                {/* Login Card */}
                <div className="card bg-base-200/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
                    <div className="card-body p-8 flex items-center justify-center">
                        {/* <h2 className="card-title text-2xl font-bold text-center text-base-content mb-6">Login</h2> */}
                    
                    {message && (
                        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'} mb-4`}>
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content mb-1">Email</span>
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email" 
                                className={`input input-bordered bg-base-100 ${errors.email ? 'input-error' : ''}`}
                                required 
                            />
                            {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content mb-1">Password</span>
                            </label>
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password" 
                                className={`input input-bordered bg-base-100 ${errors.password ? 'input-error' : ''}`}
                                required 
                            />
                            {errors.password && <span className="text-error text-sm mt-1">{errors.password}</span>}
                        </div>
                        
                        <div className="form-control mt-6 flex items-center justify-center">
                            <button 
                                type="submit"
                                className={`btn btn-primary w-1/2 ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    
                        <div className="text-center mt-4">
                            <span className="text-base-content/70">Don't have an account? </span>
                            <Link to="/register" className="link link-primary">Register here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Login;