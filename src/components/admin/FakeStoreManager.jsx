import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Download, Sync, ExternalLink, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const FakeStoreManager = () => {
  const [externalProducts, setExternalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [importResults, setImportResults] = useState(null);
  const [syncResults, setSyncResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  // Fetch external products
  const fetchExternalProducts = async (limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/products/external/fakestore?limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExternalProducts(response.data);
    } catch (error) {
      setError('Failed to fetch external products: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/products/external/fakestore/categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Import selected products
  const importProducts = async () => {
    setImporting(true);
    setError(null);
    setImportResults(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/products/import/fakestore`,
        {
          productIds: selectedProducts.length > 0 ? selectedProducts : undefined,
          limit: selectedProducts.length === 0 ? 10 : undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setImportResults(response.data);
      setSelectedProducts([]);
    } catch (error) {
      setError('Import failed: ' + error.response?.data?.message);
    } finally {
      setImporting(false);
    }
  };

  // Sync all products
  const syncProducts = async () => {
    setSyncing(true);
    setError(null);
    setSyncResults(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/products/sync/fakestore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSyncResults(response.data);
    } catch (error) {
      setError('Sync failed: ' + error.response?.data?.message);
    } finally {
      setSyncing(false);
    }
  };

  // Handle product selection
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Select all products
  const selectAllProducts = () => {
    setSelectedProducts(
      selectedProducts.length === externalProducts.length 
        ? [] 
        : externalProducts.map(p => p.id)
    );
  };

  useEffect(() => {
    fetchExternalProducts();
    fetchCategories();
  }, []);

  const renderProductCard = (product) => (
    <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={selectedProducts.includes(product.id)}
          onChange={() => toggleProductSelection(product.id)}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        
        <img 
          src={product.image} 
          alt={product.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {product.title}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Category: {product.category}
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-lg font-bold text-green-600">
              ${product.price}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-yellow-500">★</span>
              <span className="text-sm text-gray-600">
                {product.rating?.rate || 0} ({product.rating?.count || 0})
              </span>
            </div>
          </div>
          
          {/* 3D Model indicator for clothing items */}
          {product.category.includes('clothing') && (
            <div className="flex items-center space-x-1 mt-1">
              <Package className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-blue-600">3D Model Available</span>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
        {product.description}
      </p>
    </div>
  );

  const renderImportResults = () => {
    if (!importResults) return null;

    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-3">Import Results</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {importResults.summary.successful}
            </div>
            <div className="text-sm text-gray-600">Successful</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {importResults.summary.failed}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {importResults.summary.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {importResults.imported.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-green-800 mb-2">Successfully Imported:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {importResults.imported.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">
                    {item.name} ({item.action})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {importResults.errors.length > 0 && (
          <div>
            <h4 className="font-medium text-red-800 mb-2">Errors:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {importResults.errors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-gray-700">
                    {error.name}: {error.error}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSyncResults = () => {
    if (!syncResults) return null;

    return (
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-medium text-green-800 mb-3">Sync Results</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {syncResults.results.created.length}
            </div>
            <div className="text-sm text-gray-600">Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {syncResults.results.updated.length}
            </div>
            <div className="text-sm text-gray-600">Updated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {syncResults.results.errors.length}
            </div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>

        <p className="text-sm text-green-700">{syncResults.message}</p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Fake Store API Manager
        </h1>
        <p className="text-gray-600">
          Import and sync products from FakeStoreAPI.com with 3D models
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products ({externalProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories ({categories.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <>
          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => fetchExternalProducts(20)}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Products</span>
            </button>

            <button
              onClick={selectAllProducts}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <Package className="h-4 w-4" />
              <span>
                {selectedProducts.length === externalProducts.length ? 'Deselect All' : 'Select All'}
              </span>
            </button>

            <button
              onClick={importProducts}
              disabled={importing}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Download className={`h-4 w-4 ${importing ? 'animate-spin' : ''}`} />
              <span>
                {importing ? 'Importing...' : `Import ${selectedProducts.length || 'All'} Products`}
              </span>
            </button>

            <button
              onClick={syncProducts}
              disabled={syncing}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              <Sync className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync All Products'}</span>
            </button>

            <a
              href="https://fakestoreapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Visit FakeStore API</span>
            </a>
          </div>

          {/* Selected Products Counter */}
          {selectedProducts.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-800 font-medium">
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading products...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {externalProducts.map(renderProductCard)}
            </div>
          )}

          {/* Import Results */}
          {renderImportResults()}

          {/* Sync Results */}
          {renderSyncResults()}
        </>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="p-4 bg-white border rounded-lg shadow-sm text-center">
              <h3 className="font-medium text-gray-900 capitalize">
                {category.replace(/'/g, '')}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                External Category
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FakeStoreManager;
