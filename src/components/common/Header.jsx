import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, Palette } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className={`bg-gradient-to-b from-teal-500 via-teal-600 to-teal-800 shadow-lg sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Logo and User Actions */}
        <div className="flex justify-between items-center py-4 border-b border-white/20">
          {/* Logo Section - Top Left */}
          <Link to="/" className="inline-flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Palette className="h-5 w-5 text-teal-600" />
              </div>
              <h1 className="text-3xl font-bold text-white group-hover:text-teal-100 transition-colors drop-shadow-md">
                <span className="text-4xl font-bold italic" style={{fontFamily: 'cursive'}}>P</span>
                <span className="text-xl">rint</span>
                <span className="text-4xl font-bold italic" style={{fontFamily: 'cursive'}}>C</span>
                <span className="text-xl">raft</span>
              </h1>
            </div>
          </Link>

          {/* User Actions Section - Top Right */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-white hover:text-teal-100 transition-colors drop-shadow-sm"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">{user.firstName}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 p-2 text-white hover:text-teal-100 transition-colors drop-shadow-sm"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
              
              <Link
                to="/cart"
                className="p-2 text-white hover:text-teal-100 transition-colors relative drop-shadow-sm"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-teal-100 transition-colors drop-shadow-sm"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Search Section - Above Navigation */}
        <div className={`flex items-center justify-center transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 py-2 opacity-100'}`}>
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-teal-100 transition-colors drop-shadow-sm p-2 hidden md:flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span className="text-sm font-medium">Search</span>
            </button>
            
            {/* Search Bar - Toggle */}
            {isSearchOpen && (
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 pl-4 pr-4 py-2 text-sm border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-teal-100 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Section */}
        <div className={`flex items-center justify-center transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-20 py-3 opacity-100'}`}>
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white font-medium hover:text-teal-100 transition-colors drop-shadow-sm">
              Products
            </Link>
            <Link to="/custom-design" className="text-white font-medium hover:text-teal-100 transition-colors drop-shadow-sm">
              Custom Design
            </Link>
            <Link to="/how-it-works" className="text-white font-medium hover:text-teal-100 transition-colors drop-shadow-sm">
              How It Works
            </Link>
            <Link to="/about" className="text-white font-medium hover:text-teal-100 transition-colors drop-shadow-sm">
              About
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors py-2">
                  Products
                </Link>
                <Link to="/custom-design" className="text-gray-700 hover:text-purple-600 transition-colors py-2">
                  Custom Design
                </Link>
                <Link to="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors py-2">
                  How It Works
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors py-2">
                  About
                </Link>
              </nav>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="text-gray-700 hover:text-purple-600 transition-colors">
                      <User className="h-6 w-6" />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <LogOut className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors">
                    <User className="h-6 w-6" />
                  </Link>
                )}
                <Link to="/cart" className="text-gray-700 hover:text-purple-600 transition-colors relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;