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
      color: product.color,
      size: product.sizes[0],
      quantity: 1
    };
    addToCart(item);
  };

  // Mock data for now - will be replaced with API call
  const mockProducts = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      description: "Soft, comfortable cotton tee perfect for custom designs",
      category: "t-shirt",
      basePrice: 500,
      image: "https://media.istockphoto.com/id/1354020635/photo/white-t-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Dk9vgHFqFrwXQNfnEq8_0WN6IjQ35UysBNaMgUh4IjA=",
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
      basePrice: 650,
      image: "https://5.imimg.com/data5/SELLER/Default/2024/10/459451053/EZ/WJ/MX/65238933/unisex-hoddies-streetwear-hoodie-cozy-pullover-hoodie-cotton.jpg",
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
      basePrice: 300,
      image: "https://m.media-amazon.com/images/I/61BGZLfInbL._SY741_.jpg",
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
      basePrice: 350,
      image: "https://m.media-amazon.com/images/I/71IRYAuDSRL._SX679_.jpg",
      color: "White",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.5, count: 45 },
      featured: false
    },
    {
      id: 5,
      name: "Premium Crew Neck Sweatshirt",
      description: "Ultra-soft fleece-lined crew neck sweatshirt made from premium cotton blend",
      category: "sweatshirt",
      basePrice: 600,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTGvGVQ5WBmhpf4ckpinl7bpEOVoldM5rQ5tq6qM8ynpzK9fMnTEYiJKt5Ci84UAsA0P6knPr0map8QgIY_IZXJ0skwB-ZUQLo4ph0CKGYZvLutO8Auqjj0Z4E",
      color: "Gray",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.7, count: 78 },
      featured: false
    },
    {
      id: 6,
      name: "Long Sleeve Performance Tee",
      description: "Premium long sleeve performance shirt with moisture-wicking technology",
      category: "long-sleeve",
      basePrice: 400,
      image: "https://i5.walmartimages.com/seo/Paragon-Long-Islander-Performance-Long-Sleeve-T-Shirt-Size-up-to-6XL_75100390-f975-4749-a1a1-dea87f175345.8203adf9393f9f2bb0aaf90e760b817c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      color: "White",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.4, count: 56 },
      featured: false
    },
    {
      id: 7,
      name: "Zip-Up Hoodie Jacket",
      description: "Versatile zip-up hoodie perfect for layering and custom designs",
      category: "hoodie",
      basePrice: 700,
      image: "https://static.zara.net/assets/public/5149/01f4/82e345959351/4e42641349b9/00761428800-e1/00761428800-e1.jpg?ts=1742485059270&w=750",
      color: "Black",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.6, count: 92 },
      featured: true
    },
    {
      id: 8,
      name: "V-Neck T-Shirt",
      description: "Stylish V-neck tee with a modern fit and soft cotton fabric",
      category: "t-shirt",
      basePrice: 380,
      image: "https://cdn.tc.promotron.com/web-images/db9a7e0f-0104-4aa3-a882-62b8e010e894",
      color: "White",
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: { average: 4.5, count: 73 },
      featured: false
    },
    {
      id: 9,
      name: "Baseball Cap",
      description: "Adjustable baseball cap perfect for custom embroidery and logos",
      category: "accessories",
      basePrice: 250,
      image: "https://www.cockatooindia.com/cdn/shop/files/0_ac467a61-5385-41ad-871f-d394f69add57.jpg?v=1737374253&width=713",
      color: "Black",
      sizes: ["One Size"],
      rating: { average: 4.3, count: 84 },
      featured: false
    },
    {
      id: 10,
      name: "Canvas Tote Bag",
      description: "Eco-friendly canvas tote bag ideal for custom printing and daily use",
      category: "accessories",
      basePrice: 300,
      image: "https://media.istockphoto.com/id/1197598277/photo/eco-friendly-black-colour-fashion-canvas-tote-bag-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=SqXj6Ty5T6qdKXdrGqNRbrDL-uwK1ch2b4ywhQbfnks=",
      color: "Natural",
      sizes: ["One Size"],
      rating: { average: 4.4, count: 67 },
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
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
    { id: 'long-sleeve', name: 'Long Sleeve' },
    { id: 'accessories', name: 'Accessories' }
  ];

  if (loading) {
    return (
      /*<section className="py-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">*/
      <section
  className="py-16 text-white"
  style={{
    background: 'linear-gradient(to bottom right, rgba(24, 10, 93, 0.95), rgba(24, 10, 93, 0.85))',
  }}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
            <p className="mt-4 text-lg text-gray-600">High-quality apparel ready for your custom designs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(10)].map((_, index) => (
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
              /*className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category.id
                  ? 'bg-teal-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600'
              }`}*/
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
                  className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
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