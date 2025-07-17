/* global process */
// Import required modules
import express from "express";
import cors from "cors";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env' });
const env = process.env;

// Admin model schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const Admin = mongoose.model('Admin', adminSchema);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// File upload configuration
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Error handling middleware
const errorHandler = (error, req, res) => {
  console.error(error.stack);
  res.status(500).json({ message: "Something went wrong!" });
};

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);
app.use("/uploads", express.static("uploads"));

mongoose.connect(env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const contentSchema = new mongoose.Schema({
  text: String,
  mediaUrl: String,
});

const User = mongoose.model("User", userSchema);
const Content = mongoose.model("Content", contentSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (_error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Admin registration route (protected, only for initial setup)
app.post("/admin/register", [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  body("secretKey").equals(env.ADMIN_SECRET_KEY)
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({
      email,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (e) {
    console.error("Admin registration error:", e);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin login route
app.post("/admin/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: 'admin' },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (e) {
    console.error("Admin login error:", e);
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.adminId = decoded.adminId;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin dashboard data route
app.get("/admin/dashboard", verifyAdminToken, async (req, res) => {
  try {
    // Get dashboard statistics
    const totalUsers = await User.countDocuments();
    const totalContent = await Content.countDocuments();
    const recentContent = await Content.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalContent,
        activeProjects: 0, // You can implement this based on your needs
        revenue: 0 // You can implement this based on your needs
      },
      content: recentContent
    });
  } catch (_err) {
    console.error("Dashboard data error:", _err);
    res.status(500).json({ message: "Server error" });
  }
});

// User registration route
app.post("/register", [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
    res.json({ message: "User registered" });
  } catch (_err) {
    console.error("Registration error:", _err);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
  } catch (_err) {
    console.error("Login error:", _err);
    res.status(500).json({ message: "Error during login" });
  }
});

app.post("/upload", verifyToken, upload.single("media"), (req, res) => {
  res.json({ mediaUrl: `/uploads/${req.file.filename}` });
});

app.post("/content", verifyToken, async (req, res) => {
  const { text, mediaUrl } = req.body;
  const content = new Content({ text, mediaUrl });
  await content.save();
  res.json({ message: "Content saved" });
});

app.get("/content", async (req, res) => {
  const content = await Content.find();
  res.json(content);
});

app.delete("/content/:id", verifyToken, async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ message: "Content deleted" });
});



// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../../dist')));

// Catch-all route to serve the frontend's index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// Apply error handling middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;

const startServer = async (port) => {
  try {
    await new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve();
      }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          const nextPort = port + 1;
          if (nextPort < 65536) {
            console.log(`Port ${port} is busy, trying ${nextPort}...`);
          server.close();
            startServer(nextPort);
          } else {
            reject(new Error('No available ports found'));
          }
        } else {
          reject(err);
        }
      });
    });
  } catch (_err) {
    console.error('Failed to start server:', _err);
    process.exit(1);
  }
};

startServer(PORT);
