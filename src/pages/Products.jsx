import React from 'react';
import ProductGrid from '../components/products/ProductGrid.jsx';

const Products = () => {
  console.log('Products component is rendering...');
  
  return (
    <div className="min-h-screen">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
            <p className="text-xl text-gray-600">Browse our complete collection of high-quality custom apparel</p>
          </div>
        </div>
      </div>
      <ProductGrid />
    </div>
  );
};

export default Products;
