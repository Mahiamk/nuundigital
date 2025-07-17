import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectStatus,
  toggleFeatured,
  uploadProjectImage,
  getProjectsByCategory,
  getProjectStats,
  getPublicProjects
} from '../controllers/projectController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public route for portfolio (no authentication required)
router.get('/public', getPublicProjects);

// All other routes require authentication
router.use(auth);

// Get all projects with pagination and filtering
router.get('/', getAllProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Create new project
router.post('/', upload.single('featuredImage'), createProject);

// Update project
router.put('/:id', upload.single('featuredImage'), updateProject);

// Delete project
router.delete('/:id', deleteProject);

// Toggle project status (active/inactive)
router.patch('/:id/toggle-status', toggleProjectStatus);

// Toggle featured status
router.patch('/:id/toggle-featured', toggleFeatured);

// Upload project image
router.post('/:id/upload-image', upload.single('image'), uploadProjectImage);

// Get projects by category
router.get('/category/:category', getProjectsByCategory);

// Get project statistics
router.get('/stats/overview', getProjectStats);

export default router; 