import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, Package, ShoppingBag, Settings } from 'lucide-react';

const Admin = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Orders', value: '1,234', change: '+12.3%', color: 'text-green-600' },
    { name: 'Revenue', value: '$45,678', change: '+8.2%', color: 'text-green-600' },
    { name: 'Active Users', value: '892', change: '+3.1%', color: 'text-green-600' },
    { name: 'Products', value: '156', change: '+2.4%', color: 'text-green-600' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        <div className="text-gray-600">Recent orders will be displayed here...</div>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Product management interface will be implemented here...</p>
      </div>
    </div>
  );
};

const AdminOrders = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Order management interface will be implemented here...</p>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Users</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">User management interface will be implemented here...</p>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Settings panel will be implemented here...</p>
      </div>
    </div>
  );
};

export default Admin;