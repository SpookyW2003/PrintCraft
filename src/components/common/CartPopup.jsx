import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

const CartPopup = () => {
  const { showCartPopup, lastAddedItem, hideCartPopup } = useCart();

  if (!showCartPopup || !lastAddedItem) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-900">Added to Cart!</h3>
          </div>
          <button
            onClick={hideCartPopup}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {lastAddedItem.image ? (
              <img 
                src={lastAddedItem.image} 
                alt={lastAddedItem.name}
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              <ShoppingCart className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {lastAddedItem.name}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {lastAddedItem.size && (
                <span>Size: {lastAddedItem.size}</span>
              )}
              {lastAddedItem.color && (
                <span>Color: {lastAddedItem.color}</span>
              )}
              <span>Qty: {lastAddedItem.quantity}</span>
            </div>
            <p className="text-sm font-semibold text-green-600">
              ${(lastAddedItem.price * lastAddedItem.quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={hideCartPopup}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Continue Shopping
          </button>
          <Link
            to="/cart"
            onClick={hideCartPopup}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors text-center"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
