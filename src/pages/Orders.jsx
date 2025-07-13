import React from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: 1,
      orderNumber: 'PC-20241215-ABCD',
      date: '2024-12-15',
      status: 'delivered',
      total: 45.96,
      items: [
        {
          name: 'Premium Cotton T-Shirt',
          size: 'L',
          color: 'Black',
          quantity: 2,
          price: 19.99
        }
      ]
    },
    {
      id: 2,
      orderNumber: 'PC-20241210-EFGH',
      date: '2024-12-10',
      status: 'shipped',
      total: 63.97,
      items: [
        {
          name: 'Cozy Pullover Hoodie',
          size: 'M',
          color: 'Gray',
          quantity: 1,
          price: 39.99
        }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {getStatusIcon(order.status)}
                </div>
              </div>
              
              <div className="border-t pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        Size: {item.size}, Color: {item.color}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      <div className="font-medium text-gray-900">${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  View Details
                </button>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-lg font-bold text-gray-900">${order.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;