import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getAllContacts,
  createContact,
  getContactById,
  updateContactStatus,
  deleteContact,
  markAsRead,
  markAsUrgent,
  markAsReplied,
  getContactStats,
  exportContacts,
  bulkUpdateStatus
} from '../controllers/contactController.js';

const router = express.Router();

// Public route for contact form submission (no auth required)
router.post('/', createContact);

// All other routes require authentication
router.use(auth);

// Get all contacts with pagination and filtering
router.get('/', getAllContacts);

// Get contact by ID
router.get('/:id', getContactById);

// Update contact status
router.patch('/:id/status', updateContactStatus);

// Delete contact
router.delete('/:id', deleteContact);

// Mark contact as read
router.patch('/:id/read', markAsRead);

// Mark contact as urgent
router.patch('/:id/urgent', markAsUrgent);

// Mark contact as replied
router.patch('/:id/replied', markAsReplied);

// Get contact statistics
router.get('/stats/overview', getContactStats);

// Export contacts
router.get('/export/csv', exportContacts);

// Bulk update contact status
router.patch('/bulk/status', bulkUpdateStatus);

export default router; 