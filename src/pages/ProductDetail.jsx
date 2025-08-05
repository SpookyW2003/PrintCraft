import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import VirtualTryOnModal from '../components/VirtualTryOnModal.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock product data - will be replaced with API call
  const getProductById = (productId) => {
    const products = {
      1: {
        id: 1,
        name: "Premium Cotton T-Shirt",
        description: "Soft, comfortable cotton tee perfect for custom designs. Made from 100% premium cotton with a classic fit that looks great on everyone.",
        category: "t-shirt",
        basePrice: 450,
        images: [
          { url: "https://media.istockphoto.com/id/1354020635/photo/white-t-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Dk9vgHFqFrwXQNfnEq8_0WN6IjQ35UysBNaMgUh4IjA=", altText: "Front view" }
        ],
        colors: [
          { name: "White", hex: "#FFFFFF", image: "https://media.istockphoto.com/id/1354020635/photo/white-t-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Dk9vgHFqFrwXQNfnEq8_0WN6IjQ35UysBNaMgUh4IjA=" },
          { name: "Black", hex: " #1E3A8A", image: "https://media.istockphoto.com/id/1394834366/photo/blue-mens-t-shirt.jpg?s=612x612&w=0&k=20&c=WmznutVb5PXQ0TFJgA8S88Al87twl3J8ulviKA26dQg=" },
          { name: "Navy", hex: "#000000", image: "https://media.istockphoto.com/id/1830111752/photo/black-t-shirt-short-sleeve-mockup.jpg?s=612x612&w=0&k=20&c=fqMq-q2LjSt2uVUiD3VC46FaxmIDCJunEoRlJiNOswE=" },
          { name: "Red", hex: "#DC2626", image: "https://media.istockphoto.com/id/1354031012/photo/red-t-shirt-mockup-men-as-design-template-tee-shirt-blank-isolated-on-white-front-view.jpg?s=612x612&w=0&k=20&c=_5QLLkUa0-ZzSK1rp6Ie-ZRBPOEku4as4ZMrZg-y2GI=" },
          { name: "Gray", hex: "#6B7280", image: "https://media.istockphoto.com/id/1354020634/photo/gray-t-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white.jpg?s=612x612&w=0&k=20&c=HwmYmBU8FCIojsNUYZ5kE_rX7qqQ_9CxcmtK3L-JsvU=" }
        ],
        sizes: [
          { size: "XS", price: 400, stock: 5 },
          { size: "S", price: 450, stock: 10 },
          { size: "M", price: 450, stock: 15 },
          { size: "L", price: 450, stock: 12 },
          { size: "XL", price: 500, stock: 8 },
          { size: "XXL", price: 500, stock: 3 }
        ],
        rating: { average: 4.8, count: 124 },
        features: [
          "100% Premium Cotton",
          "Pre-shrunk fabric",
          "Seamless double-needle collar",
          "Taped neck and shoulders",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low, do not bleach, cool iron if needed."
      },
      2: {
        id: 2,
        name: "Cozy Pullover Hoodie",
        description: "Warm and comfortable hoodie with spacious front pocket. Perfect for casual wear and custom designs.",
        category: "hoodie",
        basePrice: 39.99,
        images: [
          { url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "Gray", hex: "#6B7280", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop" },
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1583743814966-8936f37f4ec9?w=800&h=800&fit=crop" },
          { name: "Navy", hex: "#1E3A8A", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 39.99, stock: 8 },
          { size: "M", price: 39.99, stock: 12 },
          { size: "L", price: 39.99, stock: 10 },
          { size: "XL", price: 42.99, stock: 6 },
          { size: "XXL", price: 44.99, stock: 3 }
        ],
        rating: { average: 4.7, count: 89 },
        features: [
          "80% Cotton 20% Polyester",
          "Fleece-lined interior",
          "Kangaroo pocket",
          "Drawstring hood",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low, do not bleach."
      },
      3: {
        id: 3,
        name: "Athletic Tank Top",
        description: "Lightweight and breathable tank top perfect for active wear and summer designs.",
        category: "tank-top",
        basePrice: 16.99,
        images: [
          { url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop" },
          { name: "Gray", hex: "#6B7280", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop" },
          { name: "Navy", hex: "#1E3A8A", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 16.99, stock: 15 },
          { size: "M", price: 16.99, stock: 18 },
          { size: "L", price: 16.99, stock: 12 },
          { size: "XL", price: 18.99, stock: 8 }
        ],
        rating: { average: 4.6, count: 67 },
        features: [
          "100% Cotton",
          "Moisture-wicking",
          "Lightweight fabric",
          "Athletic fit",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low."
      },
      4: {
        id: 4,
        name: "Classic Polo Shirt",
        description: "Professional polo shirt with collar and buttons. Perfect for business casual and custom embroidery.",
        category: "polo",
        basePrice: 29.99,
        images: [
          { url: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop" },
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop" },
          { name: "Navy", hex: "#1E3A8A", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=800&fit=crop" },
          { name: "Green", hex: "#059669", image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 29.99, stock: 10 },
          { size: "M", price: 29.99, stock: 14 },
          { size: "L", price: 29.99, stock: 11 },
          { size: "XL", price: 32.99, stock: 7 },
          { size: "XXL", price: 34.99, stock: 4 }
        ],
        rating: { average: 4.5, count: 45 },
        features: [
          "60% Cotton 40% Polyester",
          "Three-button placket",
          "Ribbed collar and cuffs",
          "Side vents",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, hang dry or tumble dry low."
      },
      5: {
        id: 5,
        name: "Premium Crew Neck Sweatshirt",
        description: "Ultra-soft fleece-lined crew neck sweatshirt made from premium cotton blend. Perfect for screen printing and casual everyday wear.",
        category: "sweatshirt",
        basePrice: 34.99,
        images: [
          { url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "Gray", hex: "#6B7280", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop" },
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800&h=800&fit=crop" },
          { name: "Maroon", hex: "#991B1B", image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 34.99, stock: 9 },
          { size: "M", price: 34.99, stock: 13 },
          { size: "L", price: 34.99, stock: 11 },
          { size: "XL", price: 37.99, stock: 6 },
          { size: "XXL", price: 39.99, stock: 3 }
        ],
        rating: { average: 4.7, count: 78 },
        features: [
          "80% Cotton 20% Polyester",
          "Fleece-lined interior",
          "Ribbed collar, cuffs, and hem",
          "Classic fit",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low."
      },
      6: {
        id: 6,
        name: "Long Sleeve Performance Tee",
        description: "Premium long sleeve performance shirt with moisture-wicking technology, perfect for active wear and layering in cooler weather.",
        category: "long-sleeve",
        basePrice: 24.99,
        images: [
          { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop" },
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop" },
          { name: "Gray", hex: "#6B7280", image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 24.99, stock: 12 },
          { size: "M", price: 24.99, stock: 16 },
          { size: "L", price: 24.99, stock: 13 },
          { size: "XL", price: 27.99, stock: 9 },
          { size: "XXL", price: 29.99, stock: 5 }
        ],
        rating: { average: 4.4, count: 56 },
        features: [
          "100% Cotton",
          "Long sleeves",
          "Crew neck",
          "Classic fit",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low."
      },
      7: {
        id: 7,
        name: "Zip-Up Hoodie Jacket",
        description: "Versatile zip-up hoodie perfect for layering and custom designs. Features full-zip front and adjustable hood.",
        category: "hoodie",
        basePrice: 44.99,
        images: [
          { url: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=800&h=800&fit=crop" },
          { name: "Gray", hex: "#6B7280", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop" },
          { name: "Navy", hex: "#1E3A8A", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 44.99, stock: 7 },
          { size: "M", price: 44.99, stock: 10 },
          { size: "L", price: 44.99, stock: 8 },
          { size: "XL", price: 47.99, stock: 5 },
          { size: "XXL", price: 49.99, stock: 2 }
        ],
        rating: { average: 4.6, count: 92 },
        features: [
          "80% Cotton 20% Polyester",
          "Full-zip front",
          "Adjustable drawstring hood",
          "Front pockets",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low."
      },
      8: {
        id: 8,
        name: "V-Neck T-Shirt",
        description: "Stylish V-neck tee with a modern fit and soft cotton fabric. Perfect for casual wear and custom designs.",
        category: "t-shirt",
        basePrice: 21.99,
        images: [
          { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop" },
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1583743814966-8936f37f4ec9?w=800&h=800&fit=crop" },
          { name: "Gray", hex: "#6B7280", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "S", price: 21.99, stock: 14 },
          { size: "M", price: 21.99, stock: 18 },
          { size: "L", price: 21.99, stock: 15 },
          { size: "XL", price: 24.99, stock: 10 },
          { size: "XXL", price: 26.99, stock: 6 }
        ],
        rating: { average: 4.5, count: 73 },
        features: [
          "100% Cotton",
          "V-neck design",
          "Modern fit",
          "Soft fabric",
          "Machine washable"
        ],
        careInstructions: "Machine wash cold, tumble dry low."
      },
      9: {
        id: 9,
        name: "Baseball Cap",
        description: "Adjustable baseball cap perfect for custom embroidery and logos. Classic 6-panel design with curved visor.",
        category: "accessories",
        basePrice: 18.99,
        images: [
          { url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop", altText: "Front view" }
        ],
        colors: [
          { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop" },
          { name: "Navy", hex: "#1E3A8A", image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=800&h=800&fit=crop" },
          { name: "Red", hex: "#DC2626", image: "https://images.unsplash.com/photo-1575428652377-a51a4d5d8a1b?w=800&h=800&fit=crop" }
        ],
        sizes: [
          { size: "One Size", price: 18.99, stock: 25 }
        ],
        rating: { average: 4.3, count: 84 },
        features: [
          "6-panel construction",
          "Adjustable strap closure",
          "Curved visor",
          "Embroidery-friendly",
          "One size fits most"
        ],
        careInstructions: "Spot clean only, air dry."
      },
      10: {
        id: 10,
        name: "Canvas Tote Bag",
        description: "Eco-friendly canvas tote bag ideal for custom printing and daily use. Durable construction with reinforced handles.",
        category: "accessories",
        basePrice: 14.99,
        images: [
          { url: "https://media.istockphoto.com/id/1197598277/photo/eco-friendly-black-colour-fashion-canvas-tote-bag-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=SqXj6Ty5T6qdKXdrGqNRbrDL-uwK1ch2b4ywhQbfnks=", altText: "Front view" }
        ],
        colors: [
          { name: "Natural", hex: "#ffffff", image: "https://media.istockphoto.com/id/1197598277/photo/eco-friendly-black-colour-fashion-canvas-tote-bag-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=SqXj6Ty5T6qdKXdrGqNRbrDL-uwK1ch2b4ywhQbfnks=" },
          { name: "Black", hex: "#000000", image: "https://media.istockphoto.com/id/1197598953/photo/eco-friendly-black-colour-fashion-canvas-tote-bag-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=3HMfU62MrBvLmE0u5DUZ3dt7rbSTO4a99yBE0kOUoLI=" },
          { name: "Navy", hex: "#1E3A8A", image: "https://www.mossery.co/cdn/shop/products/totebag-flow-back_1500x.png?v=1619579136" }
        ],
        sizes: [
          { size: "One Size", price: 14.99, stock: 30 }
        ],
        rating: { average: 4.4, count: 67 },
        features: [
          "100% Cotton Canvas",
          "Reinforced handles",
          "Large capacity",
          "Eco-friendly",
          "Perfect for printing"
        ],
        careInstructions: "Machine wash cold, air dry."
      }
    };
    return products[productId] || products[1]; // Default to product 1 if not found
  };

  const product = getProductById(parseInt(id));

  // Handle color change to update the product image
  const handleChangeColor = (colorName) => {
    setSelectedColor(colorName);
    const selectedColorData = product.colors.find(c => c.name === colorName);
    if (selectedColorData && selectedColorData.image) { 
      setCurrentImage(selectedColorData.image);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const selectedSizeData = product.sizes.find(s => s.size === selectedSize);
    const selectedColorData = product.colors.find(c => c.name === selectedColor);

    addToCart({
      id: product.id,
      name: product.name,
      price: selectedSizeData.price,
      size: selectedSize,
      color: selectedColor,
      colorHex: selectedColorData.hex,
      quantity: quantity,
      image: currentImage || product.images[0].url
    });

    alert('Added to cart!');
  };

  const handleVirtualTryOn = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color first to try on virtually!');
      return;
    }
    setShowVirtualTryOn(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={currentImage || product.images[activeImage].url}
                alt={product.images[activeImage].altText}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
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
            </div>

            <div className="text-3xl font-bold text-purple-600">
              ₹{selectedSize ? product.sizes.find(s => s.size === selectedSize)?.price : product.basePrice}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleChangeColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.name
                        ? 'border-purple-500 ring-2 ring-purple-200'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {color.hex === '#FFFFFF' && (
                      <div className="w-full h-full rounded-full border border-gray-200"></div>
                    )}
                  </button>
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600">Selected: {selectedColor}</p>
              )}
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    disabled={size.stock === 0}
                    className={`py-2 px-4 border rounded-md text-sm font-medium ${
                      selectedSize === size.size
                        ? 'border-purple-500 bg-purple-50 text-purple-600'
                        : size.stock === 0
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size.size}
                    {size.stock === 0 && (
                      <div className="text-xs text-red-500">Out of stock</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Virtual Try-On Button */}
            <button
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              onClick={() => handleVirtualTryOn()}
            >
              <span>Virtual Try-On</span>
            </button>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Care Instructions */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Care Instructions</h3>
              <p className="text-gray-600">{product.careInstructions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Try-On Modal */}
      {showVirtualTryOn && (
        <VirtualTryOnModal
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onClose={() => setShowVirtualTryOn(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
