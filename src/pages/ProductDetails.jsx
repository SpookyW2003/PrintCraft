import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Mock product data
  const mockProducts = {
    1: {
      id: 1,
      name: "Premium Cotton T-Shirt",
      description: "Soft, comfortable cotton tee perfect for custom designs. Made from 100% premium cotton with a relaxed fit that's perfect for everyday wear.",
      fullDescription: "This premium cotton t-shirt is crafted from the finest 100% cotton fabric, ensuring maximum comfort and durability. The classic fit provides a timeless silhouette that works for any occasion. Whether you're designing custom graphics or wearing it plain, this versatile piece is a wardrobe essential. Features include reinforced seams, pre-shrunk fabric, and colorfast dyes that maintain their vibrancy wash after wash.",
      category: "t-shirt",
      basePrice: 19.99,
      images: [
        "https://via.placeholder.com/600x600/ffffff/333333?text=T-Shirt+Front",
        "https://via.placeholder.com/600x600/ffffff/333333?text=T-Shirt+Back",
        "https://via.placeholder.com/600x600/ffffff/333333?text=T-Shirt+Side"
      ],
      colors: ['White', 'Black', 'Navy', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      rating: { average: 4.8, count: 124 },
      features: [
        "100% Premium Cotton",
        "Pre-shrunk Fabric",
        "Reinforced Seams",
        "Machine Washable",
        "Colorfast Dyes"
      ],
      specifications: {
        "Material": "100% Cotton",
        "Weight": "180 GSM",
        "Fit": "Regular",
        "Care": "Machine wash cold",
        "Origin": "Made in India"
      }
    },
    2: {
      id: 2,
      name: "Cozy Pullover Hoodie",
      description: "Warm and comfortable hoodie with spacious front pocket",
      fullDescription: "Stay warm and stylish with this premium pullover hoodie. Featuring a soft fleece interior and durable cotton-poly blend exterior, this hoodie is perfect for custom printing and everyday wear.",
      category: "hoodie",
      basePrice: 39.99,
      images: [
        "https://via.placeholder.com/600x600/cccccc/333333?text=Hoodie+Front",
        "https://via.placeholder.com/600x600/cccccc/333333?text=Hoodie+Back",
        "https://via.placeholder.com/600x600/cccccc/333333?text=Hoodie+Side"
      ],
      colors: ['Gray', 'Black', 'Navy', 'Maroon'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      rating: { average: 4.7, count: 89 },
      features: [
        "Cotton-Poly Blend",
        "Fleece Lined Interior",
        "Kangaroo Pocket",
        "Adjustable Hood",
        "Ribbed Cuffs"
      ],
      specifications: {
        "Material": "80% Cotton, 20% Polyester",
        "Weight": "280 GSM",
        "Fit": "Regular",
        "Care": "Machine wash warm",
        "Origin": "Made in India"
      }
    },
    3: {
      id: 3,
      name: "Athletic Tank Top",
      description: "Lightweight and breathable for active wear",
      fullDescription: "Perfect for workouts and casual wear, this athletic tank top offers superior comfort and breathability. The moisture-wicking fabric keeps you dry and comfortable all day long.",
      category: "tank-top",
      basePrice: 16.99,
      images: [
        "https://via.placeholder.com/600x600/ffffff/333333?text=Tank+Top+Front",
        "https://via.placeholder.com/600x600/ffffff/333333?text=Tank+Top+Back"
      ],
      colors: ['White', 'Black', 'Gray', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: { average: 4.6, count: 67 },
      features: [
        "Moisture-Wicking",
        "Lightweight Fabric",
        "Athletic Fit",
        "Quick Dry",
        "Breathable"
      ],
      specifications: {
        "Material": "95% Cotton, 5% Spandex",
        "Weight": "140 GSM",
        "Fit": "Athletic",
        "Care": "Machine wash cold",
        "Origin": "Made in India"
      }
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts[id] || mockProducts[1]; // Default to product 1 if not found
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[1] || foundProduct.sizes[0]); // Default to second size or first
      setSelectedColor(foundProduct.colors[0]); // Default to first color
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.basePrice,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    };

    addToCart(item);
  };

  const updateQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x600/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === index ? 'border-indigo-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/80x80/f3f4f6/6b7280?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.average)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.average} ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-3xl font-bold text-indigo-600 mb-4">₹{product.basePrice}</p>
              <p className="text-gray-700 text-lg leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-semibold px-4">{quantity}</span>
                <button
                  onClick={() => updateQuantity(1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Truck className="h-5 w-5 text-indigo-600" />
                <span>Free shipping on orders over ₹500</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <RefreshCw className="h-5 w-5 text-indigo-600" />
                <span>Easy returns within 30 days</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span>2-year quality guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
