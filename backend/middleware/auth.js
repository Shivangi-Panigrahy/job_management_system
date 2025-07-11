const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Middleware to authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }
    next();
  };
};

// Middleware to check if user owns the job
const checkJobOwnership = async (req, res, next) => {
  try {
    const Job = require('../models/Job');
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Admin can access all jobs
    if (req.user.role === 'admin') {
      req.job = job;
      return next();
    }

    // Check if user owns the job
    if (job.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this job' });
    }

    req.job = job;
    next();
  } catch (error) {
    console.error('Job ownership check error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  protect,
  authorize,
  checkJobOwnership
}; 