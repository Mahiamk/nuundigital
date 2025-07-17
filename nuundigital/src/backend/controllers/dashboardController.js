import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import Blog from '../models/Blog.js';
import Admin from '../models/Admin.js';

// Get Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalProjects = await Project.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    // Get recent projects
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category status createdAt');

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    // Get recent blogs
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status views createdAt');

    // Get projects by status
    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get contacts by status
    const contactsByStatus = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get projects by category
    const projectsByCategory = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get monthly stats for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyProjects = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlyContacts = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Get urgent contacts
    const urgentContacts = await Contact.find({
      priority: 'urgent',
      status: { $in: ['new', 'read'] }
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name email subject priority createdAt');

    // Get featured projects
    const featuredProjects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category featuredImage status');

    res.json({
      success: true,
      data: {
        overview: {
          totalProjects,
          totalContacts,
          totalBlogs,
          totalAdmins
        },
        recent: {
          projects: recentProjects,
          contacts: recentContacts,
          blogs: recentBlogs
        },
        analytics: {
          projectsByStatus,
          contactsByStatus,
          projectsByCategory,
          monthlyProjects,
          monthlyContacts
        },
        alerts: {
          urgentContacts,
          featuredProjects
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get Quick Actions
export const getQuickActions = async (req, res) => {
  try {
    const pendingContacts = await Contact.countDocuments({ status: 'new' });
    const draftProjects = await Project.countDocuments({ status: 'draft' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });

    res.json({
      success: true,
      data: {
        pendingContacts,
        draftProjects,
        draftBlogs
      }
    });
  } catch (error) {
    console.error('Quick actions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get System Health
export const getSystemHealth = async (req, res) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Recent activity
    const recentProjects = await Project.countDocuments({
      createdAt: { $gte: oneDayAgo }
    });

    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: oneDayAgo }
    });

    const recentBlogs = await Blog.countDocuments({
      createdAt: { $gte: oneDayAgo }
    });

    // Weekly trends
    const weeklyProjects = await Project.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });

    const weeklyContacts = await Contact.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });

    // Database connection status
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    res.json({
      success: true,
      data: {
        recentActivity: {
          projects: recentProjects,
          contacts: recentContacts,
          blogs: recentBlogs
        },
        weeklyTrends: {
          projects: weeklyProjects,
          contacts: weeklyContacts
        },
        systemStatus: {
          database: dbStatus,
          uptime: process.uptime(),
          memory: process.memoryUsage()
        }
      }
    });
  } catch (error) {
    console.error('System health error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 