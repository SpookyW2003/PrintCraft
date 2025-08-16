import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();

  const handleQuickAddToCart = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.basePrice,
      image: product.image,
      color: 'White',
      size: 'M',
      quantity: 1
    };
    addToCart(item);
  };

  // Mock data - simple and reliable
  const mockProducts = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      description: "Soft, comfortable cotton tee perfect for custom designs",
      category: "t-shirt",
      basePrice: 19.99,
      image: "https://via.placeholder.com/300x300/ffffff/333333?text=T-Shirt",
      color: "White",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.8, count: 124 },
      featured: true
    },
    {
      id: 2,
      name: "Cozy Pullover Hoodie",
      description: "Warm and comfortable hoodie with spacious front pocket",
      category: "hoodie",
      basePrice: 39.99,
      image: "https://via.placeholder.com/300x300/cccccc/333333?text=Hoodie",
      color: "Gray",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.7, count: 89 },
      featured: true
    },
    {
      id: 3,
      name: "Athletic Tank Top",
      description: "Lightweight and breathable for active wear",
      category: "tank-top",
      basePrice: 16.99,
      image: "https://via.placeholder.com/300x300/ffffff/333333?text=Tank+Top",
      color: "White",
      sizes: ["S", "M", "L", "XL"],
      rating: { average: 4.6, count: 67 },
      featured: false
    },
    {
      id: 4,
      name: "Classic Polo Shirt",
      description: "Professional polo shirt with collar and buttons",
      category: "polo",
      basePrice: 29.99,
      image: "https://via.placeholder.com/300x300/ffffff/333333?text=Polo",
      color: "White",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.5, count: 45 },
      featured: false
    },
    {
      id: 5,
      name: "Premium Crew Neck Sweatshirt",
      description: "Ultra-soft fleece-lined crew neck sweatshirt",
      category: "sweatshirt",
      basePrice: 34.99,
      image: "https://via.placeholder.com/300x300/cccccc/333333?text=Sweatshirt",
      color: "Gray",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.7, count: 78 },
      featured: false
    },
    {
      id: 6,
      name: "Long Sleeve Performance Tee",
      description: "Premium long sleeve performance shirt",
      category: "long-sleeve",
      basePrice: 24.99,
      image: "https://via.placeholder.com/300x300/ffffff/333333?text=Long+Sleeve",
      color: "White",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.4, count: 56 },
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 't-shirt', name: 'T-Shirts' },
    { id: 'hoodie', name: 'Hoodies' },
    { id: 'tank-top', name: 'Tank Tops' },
    { id: 'polo', name: 'Polo Shirts' },
    { id: 'sweatshirt', name: 'Sweatshirts' },
    { id: 'long-sleeve', name: 'Long Sleeve' }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
            <p className="mt-4 text-lg text-gray-600">Loading products...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Products</h2>
          <p className="mt-6 text-xl text-gray-600">High-quality apparel ready for your custom designs</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category.id
                  ? 'bg-indigo-900 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x300/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button 
                      onClick={() => handleQuickAddToCart(product)}
                      className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{product.rating.average}</span>
                    <span className="text-sm text-gray-500">({product.rating.count})</span>
                  </div>
                  <span className="text-2xl font-bold text-teal-600">₹{product.basePrice}</span>
                </div>
                
                <div className="flex items-center justify-center">
                  <Link
                    to={`/products/${product.id}`}  
                    className="text-white px-6 py-3 rounded-md transition-opacity font-medium w-full text-center hover:opacity-90"
                    style={{ backgroundColor: '#180A5D' }}
                  >
                    Customize Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
