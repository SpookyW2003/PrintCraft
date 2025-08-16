import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
// Basic components only for debugging
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// Temporary simple components
const SimpleHeader = () => (
  <header style={{ background: '#4F46E5', color: 'white', padding: '1rem' }}>
    <h1>PrintCraft</h1>
  </header>
);

const SimpleHero = () => (
  <section style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
    <h2>Welcome to PrintCraft</h2>
    <p>Custom T-shirt printing made easy</p>
  </section>
);

const SimpleFooter = () => (
  <footer style={{ background: '#333', color: 'white', padding: '1rem', textAlign: 'center' }}>
    <p>&copy; 2025 PrintCraft</p>
  </footer>
);

const SimpleLogin = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Login Page</h2>
    <p>Login functionality coming soon...</p>
  </div>
);

// ✨ 1. Create a Layout component. This is the shell for your pages.
const AppLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader />
      <main style={{ flexGrow: 1 }}>
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>
      <SimpleFooter />
    </div>
  );
};

function HomePage() {
  return (
    <>
      <SimpleHero />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Products Coming Soon</h3>
        <p>We're working on loading our product catalog...</p>
      </div>
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
              
            {/* ✨ 3. Simplified routes for testing */}
              <Route index element={<HomePage />} />
              <Route path="login" element={<SimpleLogin />} />
              <Route path="*" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Page Coming Soon</h2><p>This page is under development.</p></div>} />
            </Route>

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
