const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job_management');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminUser = await User.create({
        name: process.env.ADMIN_NAME || 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@jobmanagement.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      
      console.log('Admin user created successfully:', {
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      });
    } else {
      console.log('Admin user already exists');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeder error:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser }; 