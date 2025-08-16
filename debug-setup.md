# Debug PrintCraft White Screen Issue

## Steps to Debug:

### 1. Check if Basic React Works
Replace the App import temporarily to test basic React functionality:

In `src/main.jsx`, change:
```javascript
import App from './App.jsx';
```
to:
```javascript
import App from './App-minimal.jsx';
```

Then run `npm run dev` and check if you see a working page.

### 2. Check Browser Console
Open your browser's Developer Tools (F12) and check for:
- JavaScript errors in the Console tab
- Network errors (failed to load resources)
- React component errors

### 3. Common Issues to Check:

#### Issue 1: Missing CSS
Check if `src/index.css` exists and has content:
```bash
ls -la src/index.css
```

#### Issue 2: Context Providers Errors
The app uses AuthContext and CartContext. If these fail, the whole app could fail.

#### Issue 3: React Router Issues
Check if all imported pages exist and don't have syntax errors.

#### Issue 4: Three.js Dependencies
Since we added 3D model support, Three.js might be causing issues.

### 4. Step-by-Step Component Testing

Test each major component individually by creating minimal versions:

1. **Test Basic App** (use App-minimal.jsx)
2. **Test with Context** (add AuthProvider and CartProvider)
3. **Test with Router** (add full routing)
4. **Test Components** (add Header, Footer, etc.)

### 5. Check Dependencies
Ensure all dependencies are installed:
```bash
npm install
```

Check if all Three.js dependencies are properly installed:
```bash
npm list @react-three/fiber @react-three/drei three
```

### 6. Check for Port Conflicts
The app might be running on a different port. Check the Vite output for the correct URL.

### 7. Browser Cache
Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R).

## Quick Fix Commands:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Test minimal app
# Edit src/main.jsx to use App-minimal.jsx temporarily

# 3. Start dev server
npm run dev

# 4. Check console errors in browser (F12)
```

## Expected Behavior:
- If App-minimal.jsx works: Issue is in the main App.jsx or its components
- If App-minimal.jsx doesn't work: Issue is with React setup or dependencies
- Check browser console for specific error messages

## Next Steps Based on Results:
1. **If minimal works**: Gradually add components back to main App.jsx
2. **If minimal doesn't work**: Check React/Vite setup and dependencies
3. **If you see errors**: Address specific error messages in console
