import React, { useState, useEffect } from 'react';

// Cartoon Avatar Component
const CartoonAvatar = ({ selectedColor, selectedSize, productCategory, productName }) => {
  // Get color hex value from selectedColor
  const getColorHex = (colorName) => {
    const colorMap = {
      'White': '#FFFFFF',
      'Black': '#000000',
      'Red': '#DC2626',
      'Blue': '#3B82F6',
      'Navy': '#1E3A8A',
      'Gray': '#6B7280',
      'Green': '#10B981',
      'Yellow': '#F59E0B',
      'Purple': '#8B5CF6',
      'Orange': '#F97316',
      'Pink': '#EC4899',
      'Natural': '#F3F4F6'
    };
    return colorMap[colorName] || '#6B7280';
  };

  const clothingColor = getColorHex(selectedColor);
  
  // Size scaling factor for overall avatar size
  const getSizeConfig = (size) => {
    const sizeConfigs = {
      'XS': { 
        scale: 0.75, 
        bodyWidth: 35, 
        bodyHeight: 45, 
        headRadius: 18, 
        armRadius: 6, 
        legWidth: 8,
        description: 'Extra Small - Petite fit'
      },
      'S': { 
        scale: 0.85, 
        bodyWidth: 42, 
        bodyHeight: 52, 
        headRadius: 21, 
        armRadius: 7, 
        legWidth: 10,
        description: 'Small - Slim fit'
      },
      'M': { 
        scale: 1.0, 
        bodyWidth: 50, 
        bodyHeight: 60, 
        headRadius: 25, 
        armRadius: 8, 
        legWidth: 12,
        description: 'Medium - Regular fit'
      },
      'L': { 
        scale: 1.15, 
        bodyWidth: 58, 
        bodyHeight: 68, 
        headRadius: 28, 
        armRadius: 9, 
        legWidth: 14,
        description: 'Large - Comfortable fit'
      },
      'XL': { 
        scale: 1.3, 
        bodyWidth: 66, 
        bodyHeight: 76, 
        headRadius: 32, 
        armRadius: 10, 
        legWidth: 16,
        description: 'Extra Large - Relaxed fit'
      },
      'XXL': { 
        scale: 1.45, 
        bodyWidth: 74, 
        bodyHeight: 84, 
        headRadius: 35, 
        armRadius: 11, 
        legWidth: 18,
        description: 'Double XL - Generous fit'
      },
      'One Size': { 
        scale: 1.0, 
        bodyWidth: 50, 
        bodyHeight: 60, 
        headRadius: 25, 
        armRadius: 8, 
        legWidth: 12,
        description: 'One Size Fits Most'
      }
    };
    return sizeConfigs[size] || sizeConfigs['M'];
  };

  const sizeConfig = getSizeConfig(selectedSize);

  return (
    <svg viewBox="0 0 200 300" className="w-full h-full">
      {/* Background */}
      <rect width="200" height="300" fill="#F8FAFC" />
      
      {/* Size-proportional Avatar */}
      <g transform={`scale(${sizeConfig.scale}) translate(${100 - 100 * sizeConfig.scale}, ${150 - 150 * sizeConfig.scale})`}>
        
        {/* Avatar Head */}
        <circle cx="100" cy="60" r={sizeConfig.headRadius} fill="#FBBF24" stroke="#92400E" strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx={100 - sizeConfig.headRadius * 0.32} cy={60 - sizeConfig.headRadius * 0.2} r={Math.max(2, sizeConfig.headRadius * 0.12)} fill="#000" />
        <circle cx={100 + sizeConfig.headRadius * 0.32} cy={60 - sizeConfig.headRadius * 0.2} r={Math.max(2, sizeConfig.headRadius * 0.12)} fill="#000" />
        
        {/* Smile */}
        <path d={`M ${100 - sizeConfig.headRadius * 0.4} ${60 + sizeConfig.headRadius * 0.2} Q 100 ${60 + sizeConfig.headRadius * 0.48} ${100 + sizeConfig.headRadius * 0.4} ${60 + sizeConfig.headRadius * 0.2}`} stroke="#000" strokeWidth="2" fill="none" />
        
        {/* Hair */}
        <path d={`M ${100 - sizeConfig.headRadius} ${60 - sizeConfig.headRadius * 0.6} Q ${100 - sizeConfig.headRadius * 0.6} ${60 - sizeConfig.headRadius} 100 ${60 - sizeConfig.headRadius} Q ${100 + sizeConfig.headRadius * 0.6} ${60 - sizeConfig.headRadius} ${100 + sizeConfig.headRadius} ${60 - sizeConfig.headRadius * 0.6}`} fill="#8B4513" />
        
        {/* Body based on product category */}
        {productCategory === 't-shirt' && (
          <g>
            {/* T-shirt body */}
            <rect x={100 - sizeConfig.bodyWidth/2} y="85" width={sizeConfig.bodyWidth} height={sizeConfig.bodyHeight} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Sleeves */}
            <rect x={100 - sizeConfig.bodyWidth/2 - 15} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
          </g>
        )}
        
        {(productCategory === 'hoodie' || productCategory === 'sweatshirt') && (
          <g>
            {/* Hoodie body */}
            <rect x={100 - sizeConfig.bodyWidth/2 - 5} y="85" width={sizeConfig.bodyWidth + 10} height={sizeConfig.bodyHeight + 10} rx="8" fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Hood */}
            <path d={`M ${100 - sizeConfig.bodyWidth/3} 85 Q 100 ${60 + sizeConfig.headRadius + 5} ${100 + sizeConfig.bodyWidth/3} 85`} fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Pocket */}
            <rect x={100 - sizeConfig.bodyWidth/3} y={85 + sizeConfig.bodyHeight/2} width={sizeConfig.bodyWidth * 0.67} height={sizeConfig.bodyHeight/3} rx="3" fill={clothingColor} stroke="#000" strokeWidth="1" opacity="0.8" />
            {/* Sleeves */}
            <rect x={100 - sizeConfig.bodyWidth/2 - 20} y="90" width="20" height={sizeConfig.bodyHeight * 0.67} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2 + 5} y="90" width="20" height={sizeConfig.bodyHeight * 0.67} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
          </g>
        )}
        
        {productCategory === 'tank-top' && (
          <g>
            {/* Tank top body */}
            <rect x={100 - sizeConfig.bodyWidth/2 + 3} y="85" width={sizeConfig.bodyWidth - 6} height={sizeConfig.bodyHeight - 5} rx="4" fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Tank straps */}
            <rect x={100 - sizeConfig.bodyWidth/2 + 7} y="78" width="8" height="15" rx="2" fill={clothingColor} stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2 - 15} y="78" width="8" height="15" rx="2" fill={clothingColor} stroke="#000" strokeWidth="1" />
          </g>
        )}
        
        {productCategory === 'polo' && (
          <g>
            {/* Polo shirt body */}
            <rect x={100 - sizeConfig.bodyWidth/2} y="85" width={sizeConfig.bodyWidth} height={sizeConfig.bodyHeight} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Collar */}
            <path d={`M ${100 - 10} 85 L ${100 - 5} 80 L ${100 + 5} 80 L ${100 + 10} 85`} fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Buttons */}
            <circle cx="100" cy="95" r="2" fill="#FFF" stroke="#000" strokeWidth="0.5" />
            <circle cx="100" cy="105" r="2" fill="#FFF" stroke="#000" strokeWidth="0.5" />
            {/* Sleeves */}
            <rect x={100 - sizeConfig.bodyWidth/2 - 15} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
          </g>
        )}
        
        {productCategory === 'long-sleeve' && (
          <g>
            {/* Long sleeve shirt body */}
            <rect x={100 - sizeConfig.bodyWidth/2} y="85" width={sizeConfig.bodyWidth} height={sizeConfig.bodyHeight} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            {/* Long sleeves */}
            <rect x={100 - sizeConfig.bodyWidth/2 - 20} y="90" width="25" height={sizeConfig.bodyHeight * 0.83} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2 - 5} y="90" width="25" height={sizeConfig.bodyHeight * 0.83} rx="5" fill={clothingColor} stroke="#000" strokeWidth="1" />
          </g>
        )}
        
        {productCategory === 'accessories' && productName.includes('Cap') && (
          <g>
            {/* Regular shirt */}
            <rect x={100 - sizeConfig.bodyWidth/2} y="85" width={sizeConfig.bodyWidth} height={sizeConfig.bodyHeight} rx="5" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
            <rect x={100 - sizeConfig.bodyWidth/2 - 15} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
            {/* Baseball cap */}
            <ellipse cx="100" cy={60 - sizeConfig.headRadius * 0.6} rx={sizeConfig.headRadius * 0.8} ry={sizeConfig.headRadius * 0.6} fill={clothingColor} stroke="#000" strokeWidth="1" />
            <ellipse cx={100 - sizeConfig.headRadius * 0.6} cy={60 - sizeConfig.headRadius * 0.6} rx={sizeConfig.headRadius * 0.6} ry={sizeConfig.headRadius * 0.32} fill={clothingColor} stroke="#000" strokeWidth="1" />
          </g>
        )}
        
        {productCategory === 'accessories' && productName.includes('Bag') && (
          <g>
            {/* Regular shirt */}
            <rect x={100 - sizeConfig.bodyWidth/2} y="85" width={sizeConfig.bodyWidth} height={sizeConfig.bodyHeight} rx="5" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
            <rect x={100 - sizeConfig.bodyWidth/2 - 15} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
            <rect x={100 + sizeConfig.bodyWidth/2} y="90" width="15" height={sizeConfig.bodyHeight * 0.42} rx="5" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
            {/* Tote bag */}
            <rect x={100 + sizeConfig.bodyWidth/2 + 20} y="100" width="25" height="30" rx="3" fill={clothingColor} stroke="#000" strokeWidth="1" />
            <path d={`M ${100 + sizeConfig.bodyWidth/2 + 25} 100 Q ${100 + sizeConfig.bodyWidth/2 + 32.5} 95 ${100 + sizeConfig.bodyWidth/2 + 40} 100`} stroke="#000" strokeWidth="2" fill="none" />
          </g>
        )}
        
        {/* Arms */}
        <circle cx={100 - sizeConfig.bodyWidth/2 - 10} cy="110" r={sizeConfig.armRadius} fill="#FBBF24" />
        <circle cx={100 + sizeConfig.bodyWidth/2 + 10} cy="110" r={sizeConfig.armRadius} fill="#FBBF24" />
        
        {/* Legs */}
        <rect x={100 - sizeConfig.legWidth - 2} y="155" width={sizeConfig.legWidth} height="40" rx="6" fill="#3B82F6" />
        <rect x={100 + 2} y="155" width={sizeConfig.legWidth} height="40" rx="6" fill="#3B82F6" />
        
        {/* Feet */}
        <ellipse cx={100 - sizeConfig.legWidth/2 - 2} cy="200" rx="8" ry="4" fill="#000" />
        <ellipse cx={100 + sizeConfig.legWidth/2 + 2} cy="200" rx="8" ry="4" fill="#000" />
        
      </g>
      
      {/* Size indicator */}
      <text x="10" y="280" fontSize="12" fill="#6B7280" fontFamily="Arial, sans-serif">
        Size: {selectedSize} - {sizeConfig.description}
      </text>
      
      {/* Color indicator */}
      <text x="10" y="295" fontSize="12" fill="#6B7280" fontFamily="Arial, sans-serif">
        Color: {selectedColor}
      </text>
    </svg>
  );
};

const VirtualTryOnModal = ({ product, selectedSize, selectedColor, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [avatarGenerated, setAvatarGenerated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateVirtualTryOn = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAvatarGenerated(true);
        
        console.log(`Cartoon Avatar: Generated virtual try-on for ${selectedColor} ${product.category} in size ${selectedSize}`);
        
      } catch (error) {
        console.error('Error generating avatar:', error);
        setError('Failed to generate virtual try-on. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    generateVirtualTryOn();
  }, [product, selectedColor, selectedSize]);

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
              🎨 Cartoon Avatar scaled to your selected size and color
            </p>
          </div>
        </div>
        
        <div className="aspect-[2/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden flex items-center justify-center p-4">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating your cartoon avatar...</p>
              <p className="text-sm text-gray-500 mt-1">Creating virtual try-on experience</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p className="mb-2">❌ {error}</p>
              <button 
                onClick={() => setAvatarGenerated(false)} 
                className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          ) : avatarGenerated ? (
            <div className="relative w-full max-w-xs">
              <CartoonAvatar 
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                productCategory={product.category}
                productName={product.name}
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                🎨 Cartoon Avatar
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

