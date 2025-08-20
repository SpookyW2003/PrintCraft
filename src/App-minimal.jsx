import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test components
const TestHomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>PrintCraft - Home Page</h1>
    <p>Welcome to PrintCraft! This is a minimal version to test the app.</p>
  </div>
);

const TestLogin = () => (
  <div style={{ padding: '20px' }}>
    <h2>Login Page</h2>
    <p>Login functionality will be available here.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        <header style={{ 
          background: 'linear-gradient(to right, #4F46E5, #7C3AED)',
          color: 'white',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <h1>PrintCraft - Test Mode</h1>
          <nav>
            <a href="/" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Home</a>
            <a href="/login" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Login</a>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<TestHomePage />} />
            <Route path="/login" element={<TestLogin />} />
          </Routes>
        </main>
        
        <footer style={{ 
          backgroundColor: '#333', 
          color: 'white', 
          padding: '1rem', 
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <p>&copy; 2025 PrintCraft. Test version.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
