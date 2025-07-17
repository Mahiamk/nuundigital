import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getDashboardStats,
  getQuickActions,
  getSystemHealth
} from '../controllers/dashboardController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get dashboard statistics
router.get('/stats', getDashboardStats);

// Get quick actions
router.get('/quick-actions', getQuickActions);

// Get system health
router.get('/health', getSystemHealth);

export default router; 