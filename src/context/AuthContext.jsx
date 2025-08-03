import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
  const [loading, setLoading] = useState(true);
  
  // Demo credentials
  const demoCredentials = {
    admin: {
      email: 'admin@printcraft.com',
      password: 'admin123',
      user: {
        id: 1,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@printcraft.com',
        role: 'admin'
      }
    },
    customer: {
      email: 'customer@printcraft.com',
      password: 'customer123',
      user: {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'customer@printcraft.com',
        role: 'customer'
      }
    }
  };

  // Set up axios default base URL
  axios.defaults.baseURL = 'http://localhost:5000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Check demo credentials first
      const demoUser = Object.values(demoCredentials).find(
        cred => cred.email === email && cred.password === password
      );
      
      if (demoUser) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('token', token);
        setUser(demoUser.user);
        
        return { success: true, user: demoUser.user };
      }
      
      // If not demo credentials, try real API
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // For demo, just create a customer account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'customer'
      };
      
      const token = 'demo-token-' + Date.now();
      localStorage.setItem('token', token);
      setUser(newUser);
      
      return { success: true, user: newUser };
      
      // Real API call (commented out for demo)
      /*
      const response = await axios.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return { success: true, user };
      */
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};