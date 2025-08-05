import React, { useState, useEffect } from 'react';

const VirtualTryOnModal = ({ product, selectedSize, selectedColor, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [avatarImage, setAvatarImage] = useState(null);
  const [error, setError] = useState(null);

  // Demo avatar images based on product category and color
  const getDemoAvatarImage = (category, color) => {
    const avatarImages = {
      't-shirt': {
        'White': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=faces',
        'Black': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=faces',
        'Red': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=faces',
        'Gray': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=faces',
        'Navy': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=faces'
      },
      'hoodie': {
        'White': 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=faces',
        'Black': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=faces',
        'Gray': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=faces',
        'Navy': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=faces'
      },
      'default': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=faces'
    };

    return avatarImages[category]?.[color] || avatarImages['default'];
  };

  useEffect(() => {
    const generateVirtualTryOn = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get demo avatar based on product and color
        const demoImage = getDemoAvatarImage(product.category, selectedColor);
        setAvatarImage(demoImage);
        
        console.log(`Demo: Generated virtual try-on for ${selectedColor} ${product.category}`);
        
      } catch (error) {
        console.error('Error generating avatar:', error);
        setError('Failed to generate virtual try-on. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    generateVirtualTryOn();
  }, [product, selectedColor]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Virtual Try-On for {product.name}</h3>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> {selectedColor} {product.category} in size {selectedSize}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              🤖 AI Avatar generated based on average body measurements
            </p>
          </div>
        </div>
        
        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating your virtual try-on...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p className="mb-2">❌ {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          ) : avatarImage ? (
            <div className="relative w-full h-full">
              <img 
                src={avatarImage} 
                alt="Virtual Try-On Avatar" 
                className="w-full h-full object-cover"
                onError={() => setError('Failed to load avatar image')}
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                ✨ AI Generated Avatar
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No avatar generated</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💡 This is a demo of the Virtual Try-On feature. In production, this would use your actual body measurements and AI to generate a personalized avatar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnModal;

