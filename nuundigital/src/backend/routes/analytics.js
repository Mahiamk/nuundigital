import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getWebsiteAnalytics,
  getPageViews,
  getVisitorStats,
  getContactAnalytics,
  getProjectAnalytics,
  getBlogAnalytics,
  trackPageView,
  trackContact,
  getRealTimeStats,
  getAnalyticsOverview,
  exportAnalytics
} from '../controllers/analyticsController.js';

const router = express.Router();

// Public routes for tracking
router.post('/track/pageview', trackPageView);
router.post('/track/contact', trackContact);

// Protected routes (require authentication)
router.use(auth);

// Get website analytics overview
router.get('/overview', getAnalyticsOverview);

// Get detailed website analytics
router.get('/website', getWebsiteAnalytics);

// Get page views analytics
router.get('/pageviews', getPageViews);

// Get visitor statistics
router.get('/visitors', getVisitorStats);

// Get contact form analytics
router.get('/contacts', getContactAnalytics);

// Get project analytics
router.get('/projects', getProjectAnalytics);

// Get blog analytics
router.get('/blogs', getBlogAnalytics);

// Get real-time statistics
router.get('/realtime', getRealTimeStats);

// Export analytics data
router.get('/export', exportAnalytics);

export default router; 