# Job Management System

A full-stack job management application built with Node.js/Express backend and React frontend, featuring user authentication, role-based access control, and job posting/management capabilities.

## 🚀 Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Role-Based Access**: Separate dashboards for users and admins
- **Job Management**: Create, view, update, and delete job postings
- **Admin Dashboard**: Manage users and job postings
- **User Dashboard**: Browse and apply for jobs
- **Modern UI**: Built with React Bootstrap and Tailwind CSS
- **RESTful API**: Clean and well-structured backend API

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shivangi-Panigrahy/job_management_system.git
cd job_management_system
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```bash
touch backend/.env
```

Add the following environment variables:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/job_management
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### Database Setup
Make sure MongoDB is running on your system:
```bash
# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Or start MongoDB manually
mongod
```

#### Seed the Database (Optional)
To populate the database with sample data:
```bash
cd backend
npm run seed
```

#### Start the Backend Server
```bash
cd backend
npm start
```

The backend server will start on `http://localhost:8000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start the Frontend Development Server
```bash
cd frontend
npm start
```

The frontend application will start on `http://localhost:3000`

## 📁 Project Structure

```
job_management_system/
├── backend/
│   ├── controllers/          # Route controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── models/              # MongoDB models
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/              # API routes
│   │   ├── admin.js
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── utils/               # Utility functions
│   │   ├── generateToken.js
│   │   └── seeder.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/         # React context
│   │   │   └── AuthContext.js
│   │   ├── pages/           # Page components
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── UserDashboard.js
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## 👥 User Roles

### Regular User
- Register and login
- Browse available jobs
- View job details
- Access user dashboard

### Admin User
- All user permissions
- Create, edit, and delete jobs
- Manage users
- Access admin dashboard

## 🎨 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - JavaScript library
- **React Router** - Client-side routing
- **React Bootstrap** - UI components
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **Context API** - State management

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git:
```bash
cd backend
heroku create your-app-name
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
1. Build the production version:
```bash
cd frontend
npm run build
```
2. Deploy the `build` folder to your preferred hosting service

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify MongoDB port (default: 27017)

2. **Port Already in Use**
   - Change port in `.env` file
   - Kill process using the port: `lsof -ti:8000 | xargs kill -9`

3. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in React components

4. **CORS Issues**
   - Verify backend CORS configuration
   - Check frontend API base URL

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Shivangi Panigrahy**
- GitHub: [@Shivangi-Panigrahy](https://github.com/Shivangi-Panigrahy)

## 🙏 Acknowledgments

- React Bootstrap for UI components
- Tailwind CSS for styling
- MongoDB for database
- Express.js community for documentation 