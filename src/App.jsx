import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Hero from './components/common/Hero.jsx';
import ProductGrid from './components/products/ProductGrid.jsx';
import Footer from './components/common/Footer.jsx';
import CartPopup from './components/common/CartPopup.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Orders from './pages/Orders.jsx';
import Admin from './pages/Admin.jsx';
import CustomDesign from './pages/CustomDesign.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import UploadArt from './pages/uploadart.jsx';
import DesignTemplates from './pages/designtemplates.jsx';
import TextEditor from './pages/texteditor.jsx';
import Artpage from './pages/Artpage.jsx';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-indigo-900 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Products Page Component
function ProductsPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-xl text-gray-600">Browse our complete collection of high-quality custom apparel</p>
        </div>
      </div>
      <ProductGrid />
    </div>
  );
}

// ✨ 1. Create a Layout component. This is the shell for your pages.
const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Header />
      <CartPopup />
      <main className="flex-grow">
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* ✨ 2. Create a parent route that uses your new AppLayout */}
            <Route path="/" element={<AppLayout />}>
              
              {/* ✨ 3. Nest all pages that should have a Header and Footer inside */}
              <Route index element={<HomePage />} />
              <Route path="products" element={<ErrorBoundary><ProductsPage /></ErrorBoundary>} />
              <Route path="products/:id" element={<ErrorBoundary><ProductDetail /></ErrorBoundary>} />
              <Route path="cart" element={<ErrorBoundary><Cart /></ErrorBoundary>} />
              <Route path="profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
              <Route path="orders" element={<ErrorBoundary><Orders /></ErrorBoundary>} />
              <Route path="custom-design" element={<ErrorBoundary><CustomDesign /></ErrorBoundary>} />
              <Route path="how-it-works" element={<ErrorBoundary><HowItWorks /></ErrorBoundary>} />
              <Route path="about" element={<ErrorBoundary><About /></ErrorBoundary>} />
              <Route path="faq" element={<ErrorBoundary><FAQ /></ErrorBoundary>} />
              <Route path="upload-art" element={<ErrorBoundary><UploadArt /></ErrorBoundary>} />
              <Route path="design-templates" element={<ErrorBoundary><DesignTemplates /></ErrorBoundary>} />
              <Route path="text-editor" element={<ErrorBoundary><TextEditor /></ErrorBoundary>} />
              <Route path="Artpage" element={<ErrorBoundary><Artpage /></ErrorBoundary>} />
            </Route>

            {/* You can have other routes outside the main layout if needed */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<Admin />} />

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;