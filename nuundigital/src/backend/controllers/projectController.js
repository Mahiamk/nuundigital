import Project from '../models/Project.js';
import { processImage } from '../middleware/upload.js';

// Get public projects for portfolio (no authentication required)
export const getPublicProjects = async (req, res) => {
  try {
    // Only return published or active projects
    const projects = await Project.find({
      status: { $in: ['published', 'active'] }
    })
    .sort({ createdAt: -1 })
    .limit(12); // Limit to 12 most recent projects

    res.json({
      success: true,
      data: {
        projects
      }
    });
  } catch (error) {
    console.error('Get public projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all projects with pagination and filtering
export const getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.featured) filter.featured = req.query.featured === 'true';
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Get projects with pagination
    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('category', 'name');

    // Get total count for pagination
    const total = await Project.countDocuments(filter);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('category', 'name');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      client,
      technologies,
      projectUrl,
      githubUrl,
      featured,
      status
    } = req.body;

    // Handle image upload
    let featuredImage = null;
    if (req.file) {
      featuredImage = `/uploads/${req.file.filename}`;
    }

    const project = new Project({
      title,
      description,
      category,
      client,
      technologies: technologies ? JSON.parse(technologies) : [],
      projectUrl,
      githubUrl,
      featuredImage,
      featured: featured === 'true',
      status: status || 'draft'
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      client,
      technologies,
      projectUrl,
      githubUrl,
      featured,
      status
    } = req.body;

    const updateData = {
      title,
      description,
      category,
      client,
      technologies: technologies ? JSON.parse(technologies) : [],
      projectUrl,
      githubUrl,
      featured: featured === 'true',
      status
    };

    // Handle image upload
    if (req.file) {
      updateData.featuredImage = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle project status
export const toggleProjectStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.status = project.status === 'active' ? 'inactive' : 'active';
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.status}`,
      data: project
    });
  } catch (error) {
    console.error('Toggle project status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle featured status
export const toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.featured = !project.featured;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'}`,
      data: project
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Upload project image
export const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    project.images = project.images || [];
    project.images.push(imageUrl);

    await project.save();

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl,
        images: project.images
      }
    });
  } catch (error) {
    console.error('Upload project image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get projects by category
export const getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get projects by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get project statistics
export const getProjectStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const featuredProjects = await Project.countDocuments({ featured: true });
    const draftProjects = await Project.countDocuments({ status: 'draft' });

    // Projects by category
    const projectsByCategory = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Projects by status
    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent projects
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category status createdAt');

    res.json({
      success: true,
      data: {
        overview: {
          total: totalProjects,
          active: activeProjects,
          featured: featuredProjects,
          draft: draftProjects
        },
        byCategory: projectsByCategory,
        byStatus: projectsByStatus,
        recent: recentProjects
      }
    });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 