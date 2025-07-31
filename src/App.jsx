import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // ✨ Import Outlet
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
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="custom-design" element={<CustomDesign />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="about" element={<About />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="upload-art" element={<UploadArt />} />
              <Route path="design-templates" element={<DesignTemplates />} />
              <Route path="text-editor" element={<TextEditor />} />
              <Route path="Artpage" element={<Artpage />} />
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