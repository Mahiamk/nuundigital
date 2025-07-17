# Nuun Digital Backend API

A modern, secure backend API for the Nuun Digital platform with comprehensive admin dashboard functionality.

## 🚀 Features

- **Secure Authentication** - JWT-based admin authentication with rate limiting
- **Admin Dashboard** - Complete CRUD operations for projects, contacts, and blog posts
- **File Upload** - Secure file upload with image processing and validation
- **Database Models** - MongoDB with Mongoose ODM
- **Security** - Helmet, CORS, XSS protection, SQL injection prevention
- **API Documentation** - RESTful API with proper error handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd src/backend
   ```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
   ```bash
   cp config.env .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/nuundigital
   JWT_SECRET=your-super-secret-jwt-key
   ADMIN_EMAIL=admin@nuundigital.com
   ADMIN_PASSWORD=admin123456
   ADMIN_SECRET_KEY=your-admin-secret-key
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 📊 Database Models

### Admin
- Email and password authentication
- Role-based access control
- Account locking for security
- Login attempt tracking

### Project
- Title, description, category
- Image and video management
- Client information
- Status tracking (draft, in-progress, completed, published)
- SEO optimization fields

### Contact
- Contact form submissions
- Priority levels and status tracking
- Client information
- Admin assignment and notes

### Blog
- Content management
- SEO optimization
- Category and tag system
- View tracking and analytics

## 🔐 Authentication

### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@nuundigital.com",
  "password": "admin123456"
}
```

### Create Initial Admin
```http
POST /api/auth/setup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@nuundigital.com",
  "password": "admin123456",
  "secretKey": "your-admin-secret-key"
}
```

## 📈 Dashboard API

### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

### Get Quick Actions
```http
GET /api/dashboard/quick-actions
Authorization: Bearer <token>
```

### Get System Health
```http
GET /api/dashboard/health
Authorization: Bearer <token>
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/setup` - Create initial admin
- `GET /api/auth/profile` - Get admin profile
- `PUT /api/auth/profile` - Update admin profile
- `PUT /api/auth/change-password` - Change password

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/quick-actions` - Quick actions
- `GET /api/dashboard/health` - System health

### Health Check
- `GET /api/health` - Server health check

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Prevent abuse with request limiting
- **CORS Protection** - Configured for specific origins
- **XSS Protection** - Cross-site scripting prevention
- **SQL Injection Prevention** - MongoDB query sanitization
- **Helmet** - Security headers
- **Input Validation** - Express-validator for all inputs
- **File Upload Security** - File type and size validation

## 📁 File Structure

```
src/backend/
├── models/           # Database models
│   ├── Admin.js
│   ├── Project.js
│   ├── Contact.js
│   └── Blog.js
├── controllers/      # Route controllers
│   ├── authController.js
│   └── dashboardController.js
├── middleware/       # Custom middleware
│   ├── auth.js
│   └── upload.js
├── routes/          # API routes
│   ├── auth.js
│   └── dashboard.js
├── uploads/         # File uploads
├── server.js        # Main server file
├── package.json
├── config.env       # Environment template
└── README.md
```

## 🚀 Deployment

### Environment Variables
Make sure to set these environment variables in production:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nuundigital
JWT_SECRET=your-production-jwt-secret
ADMIN_SECRET_KEY=your-production-admin-secret
```

### Production Considerations
- Use HTTPS in production
- Set up proper MongoDB indexes
- Configure proper CORS origins
- Set up monitoring and logging
- Use environment-specific configurations

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure network connectivity

2. **JWT Token Issues**
   - Check JWT_SECRET in environment
   - Verify token expiration
   - Ensure proper Authorization header

3. **File Upload Errors**
   - Check upload directory permissions
   - Verify file size limits
   - Ensure proper file types

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.