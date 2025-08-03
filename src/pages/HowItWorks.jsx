import React from 'react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">How It Works</h1>
          <p className="text-xl text-gray-600 mb-12">
            Learn how to easily create your custom apparel with our platform.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Process</h2>
            <p className="text-gray-600 mb-8">
              Our three-step process makes apparel creation easy and seamless.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Design</h3>
                <p className="text-green-600">Create or upload your own design using our tools.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Order</h3>
                <p className="text-blue-600">Choose your apparel and place your order.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Receive</h3>
                <p className="text-purple-600">Get your custom apparel delivered to your doorstep.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
