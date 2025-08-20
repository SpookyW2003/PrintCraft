# New Features: 3D Models & Fake Store API Integration

This document outlines the newly implemented features for 3D model support and Fake Store API integration in PrintCraft.

## 🎨 3D Model Support

### Features Added

1. **3D Model Viewer Component** (`src/components/common/Model3DViewer.jsx`)
   - Interactive 3D model display using Three.js and @react-three/fiber
   - Support for GLB, GLTF, FBX, and OBJ formats
   - Real-time color changes and material updates
   - Auto-rotation and manual orbit controls
   - Loading states and error handling

2. **Enhanced Product Model** (`backend/models/Product.js`)
   - Added `model3D` field with support for:
     - 3D model URL and format
     - Scale, position, and rotation settings
     - Animation definitions
     - Texture mapping support

3. **3D Model Indicators**
   - Blue cube icon on product cards for items with 3D models
   - Visual distinction between regular and 3D-enabled products

### Usage

```jsx
import Model3DViewer from '../components/common/Model3DViewer';

// Basic usage
<Model3DViewer 
  product={product} 
  selectedColor="#FF0000"
  className="w-full h-96"
/>

// Advanced usage
<Model3DViewer 
  product={product}
  selectedColor="#FF0000"
  autoRotate={true}
  showControls={true}
  environment="studio"
  className="w-full h-96"
/>
```

## 🛒 Fake Store API Integration

### Features Added

1. **Fake Store Service** (`backend/services/fakeStoreService.js`)
   - Complete integration with FakeStoreAPI.com
   - Product data conversion and mapping
   - Automatic 3D model assignment for clothing items
   - Category and user data fetching

2. **Admin Management Interface** (`src/components/admin/FakeStoreManager.jsx`)
   - Browse external products before importing
   - Selective or bulk product import
   - Real-time sync with external API
   - Import/sync result tracking and error handling

3. **Enhanced API Routes** (`backend/routes/products.js`)
   - `/api/products/external/fakestore` - Browse external products
   - `/api/products/import/fakestore` - Import specific products
   - `/api/products/sync/fakestore` - Sync all products
   - `/api/products/external/fakestore/categories` - Get categories

### Admin Interface Access

1. Navigate to `/admin/fakestore` in the admin panel
2. Use the "Fake Store API" section to:
   - View external products with 3D model indicators
   - Select products for import
   - Import individual or bulk products
   - Sync existing products with latest data

## 🚀 Getting Started

### Prerequisites

1. Ensure your environment has the required dependencies:
   ```bash
   # Frontend dependencies (already included)
   - @react-three/fiber
   - @react-three/drei
   - three
   ```

2. MongoDB connection configured in `.env`

### Import Sample Data

Run the import script to populate your database with Fake Store API products:

```bash
# Navigate to backend directory
cd backend

# Import all products from Fake Store API
node scripts/importFakeStoreProducts.js

# Create only sample products with 3D models
node scripts/importFakeStoreProducts.js --sample-only

# Create samples AND import from API
node scripts/importFakeStoreProducts.js --with-samples
```

### Using the Admin Interface

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start your frontend:
   ```bash
   npm run dev
   ```

3. Login as admin and navigate to `/admin/fakestore`

4. Use the interface to:
   - Browse external products
   - Import selected products
   - Sync existing data

## 📊 API Endpoints

### External Product Management

#### GET `/api/products/external/fakestore`
Browse products from Fake Store API before importing.

**Query Parameters:**
- `limit` (optional): Number of products to fetch

**Response:**
```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack",
    "price": 109.95,
    "description": "Your perfect pack...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/...",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }
]
```

#### POST `/api/products/import/fakestore`
Import products from Fake Store API into your database.

**Request Body:**
```json
{
  "productIds": [1, 2, 3], // Optional: specific product IDs
  "limit": 10 // Optional: limit for bulk import
}
```

**Response:**
```json
{
  "message": "Import completed",
  "imported": [
    {
      "id": "67890...",
      "action": "created",
      "name": "Product Name"
    }
  ],
  "errors": [],
  "summary": {
    "total": 10,
    "successful": 9,
    "failed": 1
  }
}
```

#### POST `/api/products/sync/fakestore`
Sync all existing Fake Store products with latest data.

**Response:**
```json
{
  "message": "Sync completed successfully",
  "results": {
    "updated": ["Product 1", "Product 2"],
    "created": ["Product 3"],
    "errors": []
  }
}
```

## 🎯 3D Model Configuration

### Product Model Structure

```javascript
{
  model3D: {
    url: "https://example.com/model.glb",
    format: "glb", // glb, gltf, fbx, obj
    scale: 1,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    animations: [
      {
        name: "idle",
        duration: 2.0
      }
    ],
    textures: [
      {
        name: "base_texture",
        url: "https://example.com/texture.jpg",
        type: "diffuse"
      }
    ]
  }
}
```

### Automatic 3D Model Assignment

When importing from Fake Store API, clothing items automatically receive:
- T-shirt 3D model from Sketchfab (similar to your reference)
- Proper scaling and positioning
- Color-changing capabilities
- Base texture mapping

## 🔧 Customization

### Adding Custom 3D Models

1. Upload your 3D model to a CDN or hosting service
2. Update product in database or admin interface:
   ```javascript
   {
     model3D: {
       url: "https://your-cdn.com/custom-model.glb",
       format: "glb",
       scale: 1.2,
       position: { x: 0, y: -0.5, z: 0 }
     }
   }
   ```

### Modifying Service Configuration

Edit `backend/services/fakeStoreService.js` to:
- Change 3D model URLs
- Modify category mappings  
- Adjust product conversion logic
- Add custom product fields

## 🐛 Troubleshooting

### Common Issues

1. **3D Models Not Loading**
   - Check CORS settings for model URLs
   - Verify model format compatibility
   - Ensure stable internet connection

2. **Import Failures**
   - Verify MongoDB connection
   - Check network connectivity to FakeStoreAPI.com
   - Review error logs in console

3. **Admin Interface Access**
   - Ensure user has admin role
   - Check JWT token validity
   - Verify authentication middleware

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=printcraft:* npm run dev
```

## 🌟 Future Enhancements

1. **Advanced 3D Features**
   - Animation controls
   - Multiple model variants per product
   - AR/VR support
   - Real-time design preview

2. **External API Expansion**
   - Support for additional e-commerce APIs
   - Custom API endpoint configuration
   - Automated sync scheduling

3. **Enhanced Admin Tools**
   - Batch model assignment
   - 3D model validation
   - Performance optimization tools

## 📞 Support

For issues or questions regarding these features:
1. Check the troubleshooting section above
2. Review console logs for detailed error messages
3. Test with the provided sample data first
4. Verify all dependencies are properly installed

---

**Built with ❤️ for PrintCraft** - Enhancing the custom apparel experience with 3D visualization and seamless product management.

<citations>
<document>
<document_type>WEB_PAGE</document_type>
<document_id>https://sketchfab.com/3d-models/t-shirt-97d508268ed942ed89007023eede821b</document_id>
</document>
<document>
<document_type>WEB_PAGE</document_type>
<document_id>https://fakestoreapi.com/</document_id>
</document>
</citations>
