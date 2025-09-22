import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on app load
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (token && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', {
                email: email.trim(),
                password: password
            });

            if (response.data.token) {
                const userData = {
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email
                };
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(userData));
                
                setUser(userData);
                setIsAuthenticated(true);
                
                return { success: true, data: response.data };
            }
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed. Please try again.' 
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/api/auth/register', {
                name: name.trim(),
                email: email.trim(),
                password: password
            });

            if (response.data.token) {
                const userData = {
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email
                };
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(userData));
                
                setUser(userData);
                setIsAuthenticated(true);
                
                return { success: true, data: response.data };
            }
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed. Please try again.' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
