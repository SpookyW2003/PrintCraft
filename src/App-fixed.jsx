import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// Lazy load components with error boundaries
const Header = lazy(() => import('./components/common/Header.jsx'));
const Hero = lazy(() => import('./components/common/Hero.jsx'));
const ProductGrid = lazy(() => import('./components/products/ProductGrid.jsx'));
const Footer = lazy(() => import('./components/common/Footer.jsx'));
const CartPopup = lazy(() => import('./components/common/CartPopup.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'));

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
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red', minHeight: '200px' }}>
          <h2>Component Error</h2>
          <p>Something went wrong: {this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })} 
            style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '0.5rem 1rem', marginTop: '1rem', marginLeft: '1rem', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '2rem',
    minHeight: '200px' 
  }}>
    <div>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 2s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p>{message}</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  </div>
);

// Fallback components for when lazy components fail
const FallbackHeader = () => (
  <header style={{ background: '#4F46E5', color: 'white', padding: '1rem' }}>
    <h1>PrintCraft</h1>
  </header>
);

const FallbackHero = () => (
  <section style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
    <h2>Welcome to PrintCraft</h2>
    <p>Custom T-shirt printing made easy</p>
  </section>
);

const FallbackProducts = () => (
  <section style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Our Products</h2>
    <p>Loading products...</p>
  </section>
);

const FallbackFooter = () => (
  <footer style={{ background: '#333', color: 'white', padding: '1rem', textAlign: 'center' }}>
    <p>&copy; 2025 PrintCraft</p>
  </footer>
);

// App Layout component
const AppLayout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner message="Loading header..." />}>
            <Header />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<div style={{ height: '60px' }} />}>
            <CartPopup />
          </Suspense>
        </ErrorBoundary>
        
        <main className="flex-grow">
          <Outlet />
        </main>
        
        <ErrorBoundary>
          <Suspense fallback={<FallbackFooter />}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

// Home page component
function HomePage() {
  return (
    <ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<FallbackHero />}>
          <Hero />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<FallbackProducts />}>
          <ProductGrid />
        </Suspense>
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// Login page component
const LoginPage = () => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner message="Loading login..." />}>
      <Login />
    </Suspense>
  </ErrorBoundary>
);

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
              </Route>
              
              <Route path="/login" element={<LoginPage />} />
              
              <Route path="/products/:id" element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner message="Loading product details..." />}>
                    <ProductDetails />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="*" element={
                <div style={{padding: '2rem', textAlign: 'center'}}>
                  <h2>Page Under Development</h2>
                  <p>This page is coming soon!</p>
                </div>
              } />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
