#!/bin/bash

echo "🚀 Setting up Job Management System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    print_error "Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version $(node -v) detected"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    print_warning "MongoDB is not installed or not in PATH. Please install MongoDB and start the service."
    print_warning "You can download MongoDB from: https://www.mongodb.com/try/download/community"
else
    print_status "MongoDB detected"
fi

# Setup Backend
echo ""
echo "📦 Setting up Backend..."

cd backend

# Install dependencies
if npm install; then
    print_status "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp env.example .env
    print_status "Created .env file from template"
    print_warning "Please review and update the .env file with your configuration"
else
    print_status ".env file already exists"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."

cd frontend

# Install dependencies
if npm install; then
    print_status "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create admin user
echo ""
echo "👤 Creating admin user..."

cd backend
if node utils/seeder.js; then
    print_status "Admin user created successfully"
    print_status "Admin credentials: admin@jobmanagement.com / admin123"
else
    print_warning "Failed to create admin user. You can run 'node utils/seeder.js' manually later."
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start MongoDB service (if not already running)"
echo "2. Start the backend server:"
echo "   cd backend && npm run dev"
echo "3. Start the frontend server:"
echo "   cd frontend && npm start"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo ""
echo "🔑 Default admin credentials:"
echo "   Email: admin@jobmanagement.com"
echo "   Password: admin123"
echo ""
echo "📚 For more information, check the README files in backend/ and frontend/ directories" 