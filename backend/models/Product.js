import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['t-shirt', 'hoodie', 'tank-top', 'polo', 'sweatshirt', 'long-sleeve']
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  sizes: [{
    size: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  colors: [{
    name: {
      type: String,
      required: true
    },
    hex: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    altText: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  mockupImages: [{
    url: {
      type: String,
      required: true
    },
    color: String,
    angle: {
      type: String,
      enum: ['front', 'back', 'side', 'flat']
    }
  }],
  printAreas: [{
    name: {
      type: String,
      required: true
    },
    maxWidth: {
      type: Number,
      required: true
    },
    maxHeight: {
      type: Number,
      required: true
    },
    position: {
      x: Number,
      y: Number
    }
  }],
  material: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  care: {
    type: String,
    required: true
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);