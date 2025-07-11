const express = require('express');
const { body } = require('express-validator');
const { protect, checkJobOwnership } = require('../middleware/auth');
const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob
} = require('../controllers/jobController');

const router = express.Router();

// Validation middleware
const jobValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  body('status')
    .optional()
    .isIn(['open', 'in progress', 'done'])
    .withMessage('Status must be open, in progress, or done')
];

// All routes are protected
router.use(protect);

// Routes
router.route('/')
  .get(getJobs)
  .post(jobValidation, createJob);

router.route('/:id')
  .get(checkJobOwnership, getJob)
  .put(checkJobOwnership, jobValidation, updateJob)
  .delete(checkJobOwnership, deleteJob);

module.exports = router; 