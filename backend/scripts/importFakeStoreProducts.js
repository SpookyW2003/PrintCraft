import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import fakeStoreService from '../services/fakeStoreService.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/printcraft');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Main import function
const importProducts = async () => {
  try {
    console.log('🚀 Starting Fake Store API import...\n');

    // Fetch all products from Fake Store API
    const externalProducts = await fakeStoreService.getAllProducts();
    console.log(`📦 Found ${externalProducts.length} products from Fake Store API\n`);

    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const externalProduct of externalProducts) {
      try {
        // Check if product already exists
        const existingProduct = await Product.findOne({
          'externalSource.provider': 'fakestore',
          'externalSource.externalId': externalProduct.id.toString()
        });

        // Convert to our product model format
        const productData = fakeStoreService.convertToProductModel(externalProduct);
        productData.externalSource.lastSync = new Date();

        if (existingProduct) {
          // Update existing product
          Object.assign(existingProduct, productData);
          await existingProduct.save();
          console.log(`🔄 Updated: ${existingProduct.name}`);
          updated++;
        } else {
          // Create new product
          const newProduct = new Product(productData);
          await newProduct.save();
          console.log(`✅ Created: ${newProduct.name}`);
          created++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${externalProduct.title}:`, error.message);
        errors++;
      }
    }

    console.log('\n🎉 Import completed!');
    console.log(`✅ Created: ${created} products`);
    console.log(`🔄 Updated: ${updated} products`);
    console.log(`❌ Errors: ${errors} products`);

    // Display summary of imported products
    const totalProducts = await Product.countDocuments({ isActive: true });
    const fakeStoreProducts = await Product.countDocuments({ 
      'externalSource.provider': 'fakestore',
      isActive: true
    });

    console.log(`\n📊 Database Summary:`);
    console.log(`Total active products: ${totalProducts}`);
    console.log(`Products from Fake Store API: ${fakeStoreProducts}`);

    // Show products with 3D models
    const productsWithModels = await Product.countDocuments({ 
      'model3D.url': { $ne: null },
      isActive: true
    });
    console.log(`Products with 3D models: ${productsWithModels}`);

  } catch (error) {
    console.error('💥 Import failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

// Sample function to create test products with 3D models
const createSampleProducts = async () => {
  try {
    console.log('🎨 Creating sample products with 3D models...\n');

    const sampleProducts = [
      {
        name: "Classic White T-Shirt",
        description: "Premium cotton t-shirt with 3D model support for perfect visualization",
        category: "t-shirt",
        basePrice: 24.99,
        sizes: [
          { size: 'S', price: 24.99, stock: 50 },
          { size: 'M', price: 24.99, stock: 75 },
          { size: 'L', price: 24.99, stock: 60 },
          { size: 'XL', price: 26.99, stock: 40 },
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF', stock: 100 },
          { name: 'Black', hex: '#000000', stock: 80 },
          { name: 'Navy', hex: '#000080', stock: 60 },
        ],
        images: [{
          url: 'https://media.istockphoto.com/id/1354020635/photo/white-t-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Dk9vgHFqFrwXQNfnEq8_0WN6IjQ35UysBNaMgUh4IjA=',
          altText: 'Classic White T-Shirt',
          isDefault: true
        }],
        mockupImages: [{
          url: 'https://media.istockphoto.com/id/1354020635/photo/white-t-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Dk9vgHFqFrwXQNfnEq8_0WN6IjQ35UysBNaMgUh4IjA=',
          color: 'white',
          angle: 'front'
        }],
        model3D: {
          url: 'https://cdn.sketchfab.com/3d-models/t-shirt-97d508268ed942ed89007023eede821b/tshirt.glb',
          format: 'glb',
          scale: 1,
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          animations: [],
          textures: []
        },
        printAreas: [{
          name: 'Front Center',
          maxWidth: 280,
          maxHeight: 350,
          position: { x: 0, y: 0 }
        }],
        material: '100% Premium Cotton',
        weight: 180,
        care: 'Machine wash cold, tumble dry low',
        tags: ['t-shirt', 'cotton', '3d-model', 'custom-print'],
        isActive: true,
        featured: true,
        rating: {
          average: 4.8,
          count: 156
        },
        externalSource: {
          provider: 'custom',
          externalId: null,
          lastSync: null
        }
      }
    ];

    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ name: productData.name });
      
      if (!existingProduct) {
        const newProduct = new Product(productData);
        await newProduct.save();
        console.log(`✅ Created sample product: ${newProduct.name}`);
      } else {
        console.log(`⏭️  Sample product already exists: ${productData.name}`);
      }
    }

  } catch (error) {
    console.error('❌ Error creating sample products:', error);
  }
};

// Main execution
const main = async () => {
  await connectDB();
  
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--sample-only')) {
    await createSampleProducts();
  } else if (args.includes('--with-samples')) {
    await createSampleProducts();
    await importProducts();
  } else {
    await importProducts();
  }
};

// Run the script
main().catch(console.error);
