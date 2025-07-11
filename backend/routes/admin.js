const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllUsers,
  getAllJobs,
  getDashboardStats
} = require('../controllers/adminController');

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Routes
router.get('/users', getAllUsers);
router.get('/jobs', getAllJobs);
router.get('/dashboard', getDashboardStats);

module.exports = router; 