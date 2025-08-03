import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Design from '../models/Design.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload design
router.post('/upload', protect, upload.single('design'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: 'printcraft/designs',
        resource_type: 'image',
        transformation: [
          { width: 2000, height: 2000, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Upload failed', error: error.message });
        }

        try {
          // Save design to database
          const design = new Design({
            user: req.user.userId,
            name: req.body.name || req.file.originalname,
            description: req.body.description || '',
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
            originalName: req.file.originalname,
            fileSize: req.file.size,
            dimensions: {
              width: result.width,
              height: result.height
            },
            fileType: req.file.mimetype,
            category: req.body.category || 'graphic',
            tags: req.body.tags ? req.body.tags.split(',') : []
          });

          await design.save();
          res.status(201).json(design);
        } catch (dbError) {
          // If database save fails, delete from Cloudinary
          await cloudinary.uploader.destroy(result.public_id);
          res.status(500).json({ message: 'Database error', error: dbError.message });
        }
      }
    );

    // Convert buffer to stream for Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'printcraft/designs',
        resource_type: 'image'
      },
      result.callback
    );

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's designs
router.get('/my-designs', protect, async (req, res) => {
  try {
    const designs = await Design.find({ 
      user: req.user.userId, 
      isActive: true 
    }).sort({ createdAt: -1 });

    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single design
router.get('/:id', protect, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    
    if (!design || !design.isActive) {
      return res.status(404).json({ message: 'Design not found' });
    }

    // Check if user owns this design or it's public
    if (design.user.toString() !== req.user.userId && !design.isPublic) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(design);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete design
router.delete('/:id', protect, async (req, res) => {
  try {
    const design = await Design.findOne({ 
      _id: req.params.id, 
      user: req.user.userId 
    });

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(design.cloudinaryId);

    // Soft delete from database
    design.isActive = false;
    await design.save();

    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;