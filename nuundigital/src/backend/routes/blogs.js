import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
  uploadBlogImage,
  getBlogStats,
  publishBlog,
  getBlogAnalytics
} from '../controllers/blogController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all blogs with pagination and filtering
router.get('/', getAllBlogs);

// Get blog by ID
router.get('/:id', getBlogById);

// Create new blog
router.post('/', upload.single('featuredImage'), createBlog);

// Update blog
router.put('/:id', upload.single('featuredImage'), updateBlog);

// Delete blog
router.delete('/:id', deleteBlog);

// Toggle blog status (published/draft)
router.patch('/:id/toggle-status', toggleBlogStatus);

// Upload blog image
router.post('/:id/upload-image', upload.single('image'), uploadBlogImage);

// Get blog statistics
router.get('/stats/overview', getBlogStats);

// Publish blog
router.patch('/:id/publish', publishBlog);

// Get blog analytics
router.get('/:id/analytics', getBlogAnalytics);

export default router; 