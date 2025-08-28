import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import designRoutes from './routes/designs.js';
import adminRoutes from './routes/admin.js';
import tryOnRoutes from './routes/tryOn.js';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// ✅ Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ In-memory storage for messages (you can replace with MongoDB later)
let chatMessages = [];

// ✅ Socket.io events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Send existing messages to the newly connected user
  socket.emit("chat_history", chatMessages);

  // When user sends a message
  socket.on("send_message", (data) => {
    const message = {
      id: Date.now(),
      userId: socket.id,
      text: data.text,
      sender: data.sender || "User",
      timestamp: new Date().toISOString(),
    };

    // Store the message
    chatMessages.push(message);

    // Broadcast to all clients
    io.emit("receive_message", message);
  });

  // Optional: Join room (e.g., user ↔ admin chat)
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`📌 ${socket.id} joined room: ${room}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
const MONGO_URI = (process.env.MONGO_URI || 'mongodb://localhost:27017/printcraft', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/try-on', tryOnRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'PrintCraft API is running!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// ✅ Start server with Socket.io
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
