import React from 'react';

const CustomDesign = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Custom Design Studio</h1>
          <p className="text-xl text-gray-600 mb-12">
            Create your unique designs with our easy-to-use design tools.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Design Tools Coming Soon!</h2>
            <p className="text-gray-600 mb-8">
              Our custom design studio is currently under development. You'll soon be able to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <a href="/upload-art">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Upload Your Art</h3>
                <p className="text-purple-600">Upload your own designs and logos</p>
              </div>
                </a>
                <a href="/design-templates">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Design Templates</h3>
                <p className="text-green-600">Choose from hundreds of pre-made templates</p>
              </div>
              </a>
              <a href="/text-editor">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Text Editor</h3>
                <p className="text-blue-600">Add custom text with various fonts and styles</p>
              </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
