import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import Blog from '../models/Blog.js';

// Analytics model for tracking page views and interactions
const Analytics = mongoose.model('Analytics', new mongoose.Schema({
  type: { type: String, required: true, enum: ['pageview', 'contact', 'project_view', 'blog_view'] },
  page: { type: String, required: true },
  userAgent: String,
  ipAddress: String,
  referrer: String,
  sessionId: String,
  timestamp: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true }));

// Track page view
export const trackPageView = async (req, res) => {
  try {
    const { page, userAgent, ipAddress, referrer, sessionId } = req.body;

    const analytics = new Analytics({
      type: 'pageview',
      page,
      userAgent,
      ipAddress,
      referrer,
      sessionId,
      metadata: {
        timestamp: new Date(),
        userAgent: userAgent,
        ipAddress: ipAddress
      }
    });

    await analytics.save();

    res.json({
      success: true,
      message: 'Page view tracked'
    });
  } catch (error) {
    console.error('Track page view error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Track contact form submission
export const trackContact = async (req, res) => {
  try {
    const { page, userAgent, ipAddress, referrer, sessionId } = req.body;

    const analytics = new Analytics({
      type: 'contact',
      page,
      userAgent,
      ipAddress,
      referrer,
      sessionId,
      metadata: {
        timestamp: new Date(),
        userAgent: userAgent,
        ipAddress: ipAddress
      }
    });

    await analytics.save();

    res.json({
      success: true,
      message: 'Contact tracked'
    });
  } catch (error) {
    console.error('Track contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get website analytics overview
export const getAnalyticsOverview = async (req, res) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Page views
    const totalPageViews = await Analytics.countDocuments({ type: 'pageview' });
    const todayPageViews = await Analytics.countDocuments({
      type: 'pageview',
      timestamp: { $gte: oneDayAgo }
    });
    const weekPageViews = await Analytics.countDocuments({
      type: 'pageview',
      timestamp: { $gte: oneWeekAgo }
    });

    // Contact submissions
    const totalContacts = await Analytics.countDocuments({ type: 'contact' });
    const todayContacts = await Analytics.countDocuments({
      type: 'contact',
      timestamp: { $gte: oneDayAgo }
    });
    const weekContacts = await Analytics.countDocuments({
      type: 'contact',
      timestamp: { $gte: oneWeekAgo }
    });

    // Unique visitors (by session)
    const uniqueVisitors = await Analytics.distinct('sessionId', {
      type: 'pageview',
      timestamp: { $gte: oneDayAgo }
    });

    // Top pages
    const topPages = await Analytics.aggregate([
      { $match: { type: 'pageview' } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Traffic sources
    const trafficSources = await Analytics.aggregate([
      { $match: { type: 'pageview', referrer: { $exists: true, $ne: '' } } },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalPageViews,
          todayPageViews,
          weekPageViews,
          totalContacts,
          todayContacts,
          weekContacts,
          uniqueVisitors: uniqueVisitors.length
        },
        topPages,
        trafficSources
      }
    });
  } catch (error) {
    console.error('Get analytics overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get detailed website analytics
export const getWebsiteAnalytics = async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '1d':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Daily page views
    const dailyPageViews = await Analytics.aggregate([
      {
        $match: {
          type: 'pageview',
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Daily contacts
    const dailyContacts = await Analytics.aggregate([
      {
        $match: {
          type: 'contact',
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Device types
    const deviceTypes = await Analytics.aggregate([
      {
        $match: {
          type: 'pageview',
          timestamp: { $gte: startDate }
        }
      },
      {
        $addFields: {
          deviceType: {
            $cond: {
              if: { $regexMatch: { input: '$userAgent', regex: /Mobile|Android|iPhone/i } },
              then: 'Mobile',
              else: {
                $cond: {
                  if: { $regexMatch: { input: '$userAgent', regex: /Tablet|iPad/i } },
                  then: 'Tablet',
                  else: 'Desktop'
                }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: '$deviceType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        dailyPageViews,
        dailyContacts,
        deviceTypes
      }
    });
  } catch (error) {
    console.error('Get website analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get page views analytics
export const getPageViews = async (req, res) => {
  try {
    const { page, period = '7d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '1d':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const matchQuery = {
      type: 'pageview',
      timestamp: { $gte: startDate }
    };

    if (page) {
      matchQuery.page = page;
    }

    const pageViews = await Analytics.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' }
        }
      },
      {
        $addFields: {
          uniqueVisitors: { $size: '$uniqueVisitors' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: pageViews
    });
  } catch (error) {
    console.error('Get page views error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get visitor statistics
export const getVisitorStats = async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '1d':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Unique visitors by day
    const uniqueVisitorsByDay = await Analytics.aggregate([
      {
        $match: {
          type: 'pageview',
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          uniqueVisitors: { $addToSet: '$sessionId' }
        }
      },
      {
        $addFields: {
          uniqueVisitors: { $size: '$uniqueVisitors' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Returning visitors
    const allSessions = await Analytics.distinct('sessionId', {
      type: 'pageview',
      timestamp: { $gte: startDate }
    });

    const returningVisitors = await Analytics.aggregate([
      {
        $match: {
          type: 'pageview',
          sessionId: { $in: allSessions }
        }
      },
      {
        $group: {
          _id: '$sessionId',
          visitCount: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          newVisitors: {
            $sum: { $cond: [{ $eq: ['$visitCount', 1] }, 1, 0] }
          },
          returningVisitors: {
            $sum: { $cond: [{ $gt: ['$visitCount', 1] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        uniqueVisitorsByDay,
        visitorTypes: returningVisitors[0] || { newVisitors: 0, returningVisitors: 0 }
      }
    });
  } catch (error) {
    console.error('Get visitor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get contact analytics
export const getContactAnalytics = async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    // Contact submissions by day
    const contactsByDay = await Analytics.aggregate([
      {
        $match: {
          type: 'contact',
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Contact conversion rate (contacts per page view)
    const totalPageViews = await Analytics.countDocuments({
      type: 'pageview',
      timestamp: { $gte: startDate }
    });

    const totalContacts = await Analytics.countDocuments({
      type: 'contact',
      timestamp: { $gte: startDate }
    });

    const conversionRate = totalPageViews > 0 ? (totalContacts / totalPageViews) * 100 : 0;

    res.json({
      success: true,
      data: {
        contactsByDay,
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalContacts,
        totalPageViews
      }
    });
  } catch (error) {
    console.error('Get contact analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get project analytics
export const getProjectAnalytics = async (req, res) => {
  try {
    const projects = await Project.find()
      .select('title views featuredImage status createdAt')
      .sort({ views: -1 });

    const totalViews = projects.reduce((sum, project) => sum + (project.views || 0), 0);
    const averageViews = projects.length > 0 ? totalViews / projects.length : 0;

    res.json({
      success: true,
      data: {
        projects,
        totalViews,
        averageViews: Math.round(averageViews * 100) / 100,
        totalProjects: projects.length
      }
    });
  } catch (error) {
    console.error('Get project analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get blog analytics
export const getBlogAnalytics = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .select('title views status publishedAt createdAt')
      .sort({ views: -1 });

    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const averageViews = blogs.length > 0 ? totalViews / blogs.length : 0;
    const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;

    res.json({
      success: true,
      data: {
        blogs,
        totalViews,
        averageViews: Math.round(averageViews * 100) / 100,
        totalBlogs: blogs.length,
        publishedBlogs
      }
    });
  } catch (error) {
    console.error('Get blog analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get real-time statistics
export const getRealTimeStats = async (req, res) => {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Current active users (sessions in last hour)
    const activeUsers = await Analytics.distinct('sessionId', {
      type: 'pageview',
      timestamp: { $gte: oneHourAgo }
    });

    // Page views in last hour
    const hourlyPageViews = await Analytics.countDocuments({
      type: 'pageview',
      timestamp: { $gte: oneHourAgo }
    });

    // Contacts in last hour
    const hourlyContacts = await Analytics.countDocuments({
      type: 'contact',
      timestamp: { $gte: oneHourAgo }
    });

    // Today's page views
    const todayPageViews = await Analytics.countDocuments({
      type: 'pageview',
      timestamp: { $gte: oneDayAgo }
    });

    // Today's contacts
    const todayContacts = await Analytics.countDocuments({
      type: 'contact',
      timestamp: { $gte: oneDayAgo }
    });

    res.json({
      success: true,
      data: {
        activeUsers: activeUsers.length,
        hourlyPageViews,
        hourlyContacts,
        todayPageViews,
        todayContacts
      }
    });
  } catch (error) {
    console.error('Get real-time stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Export analytics data
export const exportAnalytics = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    const matchQuery = {};
    if (type) matchQuery.type = type;
    if (startDate || endDate) {
      matchQuery.timestamp = {};
      if (startDate) matchQuery.timestamp.$gte = new Date(startDate);
      if (endDate) matchQuery.timestamp.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(matchQuery)
      .sort({ timestamp: -1 })
      .limit(1000);

    // Convert to CSV format
    const csvHeader = 'Type,Page,User Agent,IP Address,Referrer,Session ID,Timestamp\n';
    const csvData = analytics.map(record => {
      return `"${record.type}","${record.page}","${record.userAgent || ''}","${record.ipAddress || ''}","${record.referrer || ''}","${record.sessionId || ''}","${record.timestamp}"`;
    }).join('\n');

    const csv = csvHeader + csvData;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=analytics.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 