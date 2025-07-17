import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  adminLogin,
  getProfile,
  updateProfile,
  changePassword,
  createInitialAdmin
} from '../controllers/authController.js';

const router = express.Router();

// Validation middleware
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const profileValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please enter a valid email')
];

const passwordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
];

const createAdminValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('secretKey').notEmpty().withMessage('Secret key is required')
];

// Routes
router.post('/login', loginValidation, adminLogin);
router.post('/setup', createAdminValidation, createInitialAdmin);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, profileValidation, updateProfile);
router.put('/change-password', auth, passwordValidation, changePassword);

export default router; 