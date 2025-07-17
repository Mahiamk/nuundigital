import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (admin.isLocked()) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed attempts. Please try again later.'
      });
    }

    // Verify password
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      await admin.incLoginAttempts();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get Admin Profile
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update Admin Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email.toLowerCase();

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: admin
    });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);
    const isValidPassword = await admin.comparePassword(currentPassword);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create Initial Admin (for setup)
export const createInitialAdmin = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Invalid secret key'
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      password,
      role: 'super-admin'
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Initial admin created successfully'
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 