import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Simple components to test each part
const TestContext = ({ children }) => {
  console.log('TestContext rendering...');
  return <div>{children}</div>;
};

const TestHeader = () => {
  console.log('TestHeader rendering...');
  return (
    <header style={{ background: '#4F46E5', color: 'white', padding: '1rem' }}>
      <h1>PrintCraft - Debug</h1>
      <p>If you see this, the header is working!</p>
    </header>
  );
};

const TestHero = () => {
  console.log('TestHero rendering...');
  return (
    <section style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
      <h2>Hero Section Working</h2>
      <p>This is the hero component</p>
    </section>
  );
};

const TestProductGrid = () => {
  console.log('TestProductGrid rendering...');
  return (
    <section style={{ padding: '2rem' }}>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h3>Product {i}</h3>
            <p>Price: $19.99</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const TestFooter = () => {
  console.log('TestFooter rendering...');
  return (
    <footer style={{ background: '#333', color: 'white', padding: '1rem', textAlign: 'center' }}>
      <p>&copy; 2025 PrintCraft - Debug Mode</p>
    </footer>
  );
};

const TestLayout = () => {
  console.log('TestLayout rendering...');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TestHeader />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      <TestFooter />
    </div>
  );
};

const TestHomePage = () => {
  console.log('TestHomePage rendering...');
  return (
    <div>
      <TestHero />
      <TestProductGrid />
    </div>
  );
};

const TestLogin = () => {
  console.log('TestLogin rendering...');
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Login Page</h2>
      <p>This is the login page</p>
    </div>
  );
};

function App() {
  console.log('App component rendering...');
  
  return (
    <TestContext>
      <Router>
        <Routes>
          <Route path="/" element={<TestLayout />}>
            <Route index element={<TestHomePage />} />
          </Route>
          <Route path="/login" element={<TestLogin />} />
          <Route path="*" element={
            <div style={{padding: '2rem', textAlign: 'center'}}>
              <h2>404 - Page Not Found</h2>
              <p>This page doesn't exist yet.</p>
            </div>
          } />
        </Routes>
      </Router>
    </TestContext>
  );
}

export default App;
