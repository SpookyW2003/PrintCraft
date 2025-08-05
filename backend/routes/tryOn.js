import express from 'express';
import Replicate from 'replicate';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || 'your-replicate-token-here'
});

// Helper function to convert measurements to body type description
const generateBodyDescription = (measurements) => {
  const { height, weight, chest, waist, hips, bodyShape, gender } = measurements;
  
  let bodyDescription = `${gender || 'person'} with ${bodyShape || 'average'} body shape, `;
  bodyDescription += `height ${height}cm, weight ${weight}kg, `;
  bodyDescription += `chest ${chest}cm, waist ${waist}cm, hips ${hips}cm`;
  
  return bodyDescription;
};

// POST route to generate virtual try-on using Stable Diffusion
router.post('/generate-avatar', protect, async (req, res) => {
  try {
    const { measurements, productInfo, designImage } = req.body;
    
    if (!measurements || !productInfo) {
      return res.status(400).json({ 
        message: 'Body measurements and product info are required' 
      });
    }

    // Create a detailed prompt for the AI model
    const bodyDescription = generateBodyDescription(measurements);
    const prompt = `Professional fashion model with ${bodyDescription}, wearing a ${productInfo.color} ${productInfo.category} with custom design, high quality studio lighting, fashion photography, realistic, detailed`;
    
    console.log('Generating avatar with prompt:', prompt);

    // Use Flux model for high-quality image generation
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro-ultra",
      {
        input: {
          prompt: prompt,
          aspect_ratio: "3:4",
          output_format: "jpg",
          output_quality: 90
        }
      }
    );

    res.json({ 
      success: true,
      image: output,
      prompt: prompt,
      measurements: measurements,
      productInfo: productInfo
    });
    
  } catch (error) {
    console.error('Error generating avatar:', error);
    
    // Handle specific Replicate errors
    if (error.message?.includes('authentication')) {
      return res.status(401).json({ 
        message: 'AI service authentication failed. Please check API token.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error generating virtual try-on avatar', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST route to update user body measurements
router.post('/measurements', protect, async (req, res) => {
  try {
    const { measurements } = req.body;
    const userId = req.user.id;

    // Validate measurements
    const requiredFields = ['height', 'weight', 'chest', 'waist', 'hips'];
    const missingFields = requiredFields.filter(field => !measurements[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required measurements: ${missingFields.join(', ')}`
      });
    }

    // Update user measurements (you'll need to import User model)
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { bodyMeasurements: measurements },
    //   { new: true }
    // );

    res.json({
      success: true,
      message: 'Measurements saved successfully',
      measurements
    });
    
  } catch (error) {
    console.error('Error saving measurements:', error);
    res.status(500).json({ 
      message: 'Error saving measurements',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET route to fetch user measurements
router.get('/measurements', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Fetch user measurements (you'll need to import User model)
    // const user = await User.findById(userId).select('bodyMeasurements');
    
    // For now, return demo data
    const demoMeasurements = {
      height: 170,
      weight: 65,
      chest: 90,
      waist: 75,
      hips: 95,
      bodyShape: 'rectangle',
      gender: 'unisex',
      preferredFit: 'regular'
    };

    res.json({
      success: true,
      measurements: demoMeasurements
    });
    
  } catch (error) {
    console.error('Error fetching measurements:', error);
    res.status(500).json({ 
      message: 'Error fetching measurements',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Demo route without authentication for testing
router.post('/generate-avatar-demo', async (req, res) => {
  try {
    const { measurements, productInfo, designImage } = req.body;
    
    // For demo purposes, we'll simulate the AI generation
    // You can replace this with actual Replicate API call once you have the token
    console.log('Demo: Generating avatar with measurements:', measurements);
    console.log('Demo: Product info:', productInfo);
    
    // Simulate a delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a demo image URL (you can replace with actual generated image)
    const demoAvatarImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=faces';
    
    res.json({ 
      success: true,
      image: demoAvatarImage,
      message: 'Demo avatar generated successfully',
      measurements: measurements,
      productInfo: productInfo
    });
    
  } catch (error) {
    console.error('Error in demo avatar generation:', error);
    res.status(500).json({ 
      message: 'Error generating demo avatar', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
