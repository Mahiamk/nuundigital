import Blog from '../models/Blog.js';

// Get all blogs with pagination and filtering
export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Get blogs with pagination
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');

    // Get total count for pagination
    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      metaTitle,
      metaDescription,
      allowComments
    } = req.body;

    // Handle image upload
    let featuredImage = null;
    if (req.file) {
      featuredImage = `/uploads/${req.file.filename}`;
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      category,
      tags: tags ? JSON.parse(tags) : [],
      featuredImage,
      status: status || 'draft',
      metaTitle,
      metaDescription,
      allowComments: allowComments === 'true',
      author: req.user.id
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      metaTitle,
      metaDescription,
      allowComments
    } = req.body;

    const updateData = {
      title,
      excerpt,
      content,
      category,
      tags: tags ? JSON.parse(tags) : [],
      status,
      metaTitle,
      metaDescription,
      allowComments: allowComments === 'true'
    };

    // Handle image upload
    if (req.file) {
      updateData.featuredImage = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle blog status
export const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.status = blog.status === 'published' ? 'draft' : 'published';
    if (blog.status === 'published') {
      blog.publishedAt = new Date();
    }
    await blog.save();

    res.json({
      success: true,
      message: `Blog ${blog.status}`,
      data: blog
    });
  } catch (error) {
    console.error('Toggle blog status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Upload blog image
export const uploadBlogImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    blog.images = blog.images || [];
    blog.images.push(imageUrl);

    await blog.save();

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl,
        images: blog.images
      }
    });
  } catch (error) {
    console.error('Upload blog image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get blog statistics
export const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // Blogs by status
    const blogsByStatus = await Blog.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Blogs by category
    const blogsByCategory = await Blog.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly blogs for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyBlogs = await Blog.aggregate([
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

    // Top viewed blogs
    const topViewedBlogs = await Blog.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views status createdAt');

    // Recent blogs
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status views createdAt');

    res.json({
      success: true,
      data: {
        overview: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
          totalViews: totalViews[0]?.totalViews || 0
        },
        byStatus: blogsByStatus,
        byCategory: blogsByCategory,
        monthly: monthlyBlogs,
        topViewed: topViewedBlogs,
        recent: recentBlogs
      }
    });
  } catch (error) {
    console.error('Get blog stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Publish blog
export const publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.status = 'published';
    blog.publishedAt = new Date();
    await blog.save();

    res.json({
      success: true,
      message: 'Blog published successfully',
      data: blog
    });
  } catch (error) {
    console.error('Publish blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get blog analytics
export const getBlogAnalytics = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Get view trends for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // This would require a separate analytics collection
    // For now, we'll return basic blog data
    res.json({
      success: true,
      data: {
        blog: {
          id: blog._id,
          title: blog.title,
          views: blog.views,
          status: blog.status,
          publishedAt: blog.publishedAt,
          createdAt: blog.createdAt
        },
        analytics: {
          totalViews: blog.views,
          averageTimeOnPage: 0, // Would need tracking
          bounceRate: 0, // Would need tracking
          socialShares: 0 // Would need tracking
        }
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