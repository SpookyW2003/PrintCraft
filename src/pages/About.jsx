import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            Discover more about PrintCraft and our mission to deliver top-notch custom apparel.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-8">
              PrintCraft was founded with the vision of making custom apparel accessible to everyone.
              We pride ourselves on our quality and service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

