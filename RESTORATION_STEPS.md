# PrintCraft - Step-by-Step Restoration Guide

## Current Status
- ✅ Simple version should be working at http://localhost:5174/
- The app shows basic header, hero section, and footer
- Contexts (AuthProvider, CartProvider) are working

## Step 1: Add Back Basic Components (RECOMMENDED NEXT STEP)

Replace the simple components with the actual ones, one by one:

### 1.1 Add Header Component
```javascript
// In App.jsx, replace SimpleHeader import with:
import Header from './components/common/Header.jsx';

// Replace <SimpleHeader /> with <Header />
```

### 1.2 Add Hero Component  
```javascript
// Add import:
import Hero from './components/common/Hero.jsx';

// Replace <SimpleHero /> with <Hero />
```

### 1.3 Add Footer Component
```javascript
// Add import:
import Footer from './components/common/Footer.jsx';

// Replace <SimpleFooter /> with <Footer />
```

## Step 2: Add Product Grid (3D Models)

```javascript
// Add import:
import ProductGrid from './components/products/ProductGrid.jsx';

// Replace the "Products Coming Soon" div with:
<ProductGrid />
```

## Step 3: Add CartPopup

```javascript
// Add import:
import CartPopup from './components/common/CartPopup.jsx';

// Add <CartPopup /> after <Header />
```

## Step 4: Add Page Routes Gradually

Add each route one by one, testing after each addition:

```javascript
// Add imports:
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Add routes:
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
```

## Step 5: Add Complex Routes

Once basic routes work, add the complex ones:

```javascript
import Admin from './pages/Admin.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
// ... other complex components
```

## Troubleshooting Each Step

### If Header Fails:
- Check if lucide-react icons are installed
- Verify AuthContext is working
- Check console for specific errors

### If ProductGrid Fails:
- The issue might be with the API call or 3D model components
- Check if axios is working
- Verify Three.js dependencies

### If 3D Models Fail:
- Check Three.js dependencies: `npm list three @react-three/fiber @react-three/drei`
- Verify 3D model URLs are accessible
- Check console for WebGL errors

## Quick Fixes

### Install Missing Dependencies
```bash
npm install three @react-three/fiber @react-three/drei lucide-react
```

### Check for Syntax Errors
```bash
npm run build
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json
npm install
```

## Testing Each Step

1. Start with simple version ✅
2. Add ONE component at a time
3. Refresh browser and check for errors
4. If something breaks, check browser console (F12)
5. Fix error before proceeding to next component

## Expected Working Order

1. ✅ Simple components (current)
2. ✅ Header + Footer + Hero
3. ✅ ProductGrid (without 3D models)  
4. ✅ Basic routes (Login, Register)
5. ✅ CartPopup
6. ✅ ProductGrid (with 3D models)
7. ✅ Complex routes (Admin, ProductDetail)
8. ✅ All features restored

This approach ensures you can identify exactly which component is causing issues.
