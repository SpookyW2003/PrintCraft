import axios from 'axios';

const FAKE_STORE_API_BASE = 'https://fakestoreapi.com';

class FakeStoreService {
  constructor() {
    this.api = axios.create({
      baseURL: FAKE_STORE_API_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  // Get all products from Fake Store API
  async getAllProducts(limit = null) {
    try {
      let url = '/products';
      if (limit) {
        url += `?limit=${limit}`;
      }
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products from Fake Store API:', error);
      throw new Error('Failed to fetch products from external API');
    }
  }

  // Get single product from Fake Store API
  async getProduct(id) {
    try {
      const response = await this.api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id} from Fake Store API:`, error);
      throw new Error('Failed to fetch product from external API');
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const response = await this.api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw new Error('Failed to fetch products by category');
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const response = await this.api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories from Fake Store API:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Convert Fake Store API product to our Product model format
  convertToProductModel(fakeStoreProduct) {
    // Map categories from Fake Store API to our categories
    const categoryMap = {
      "men's clothing": "t-shirt",
      "women's clothing": "t-shirt", 
      "electronics": "t-shirt", // Default fallback
      "jewelery": "t-shirt" // Default fallback
    };

    // Generate default sizes and colors for clothing items
    const defaultSizes = [
      { size: 'S', price: fakeStoreProduct.price, stock: 10 },
      { size: 'M', price: fakeStoreProduct.price, stock: 15 },
      { size: 'L', price: fakeStoreProduct.price, stock: 12 },
      { size: 'XL', price: fakeStoreProduct.price + 2, stock: 8 }
    ];

    const defaultColors = [
      { name: 'White', hex: '#FFFFFF', stock: 20 },
      { name: 'Black', hex: '#000000', stock: 15 },
      { name: 'Navy', hex: '#000080', stock: 12 }
    ];

    // Add 3D model for clothing items
    const model3D = fakeStoreProduct.category.includes('clothing') ? {
      url: 'https://cdn.sketchfab.com/3d-models/t-shirt-97d508268ed942ed89007023eede821b/tshirt.glb',
      format: 'glb',
      scale: 1,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      animations: [],
      textures: [
        {
          name: 'base_texture',
          url: fakeStoreProduct.image,
          type: 'diffuse'
        }
      ]
    } : null;

    return {
      name: fakeStoreProduct.title,
      description: fakeStoreProduct.description,
      category: categoryMap[fakeStoreProduct.category] || 't-shirt',
      basePrice: Math.round(fakeStoreProduct.price),
      sizes: defaultSizes,
      colors: defaultColors,
      images: [{
        url: fakeStoreProduct.image,
        altText: fakeStoreProduct.title,
        isDefault: true
      }],
      mockupImages: [{
        url: fakeStoreProduct.image,
        color: 'white',
        angle: 'front'
      }],
      model3D: model3D,
      printAreas: [{
        name: 'Front Center',
        maxWidth: 280,
        maxHeight: 350,
        position: { x: 0, y: 0 }
      }],
      material: fakeStoreProduct.category.includes('clothing') ? '100% Cotton' : 'Mixed Materials',
      weight: 180, // Default weight in grams
      care: 'Machine wash cold, tumble dry low',
      tags: [fakeStoreProduct.category, 'imported'],
      isActive: true,
      featured: fakeStoreProduct.rating?.rate > 4.0,
      rating: {
        average: fakeStoreProduct.rating?.rate || 0,
        count: fakeStoreProduct.rating?.count || 0
      },
      // Store original Fake Store API data for reference
      externalSource: {
        provider: 'fakestore',
        externalId: fakeStoreProduct.id,
        lastSync: new Date()
      }
    };
  }

  // Get all users (for admin purposes)
  async getAllUsers() {
    try {
      const response = await this.api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users from Fake Store API:', error);
      throw new Error('Failed to fetch users');
    }
  }

  // Get all carts
  async getAllCarts() {
    try {
      const response = await this.api.get('/carts');
      return response.data;
    } catch (error) {
      console.error('Error fetching carts from Fake Store API:', error);
      throw new Error('Failed to fetch carts');
    }
  }
}

export default new FakeStoreService();
