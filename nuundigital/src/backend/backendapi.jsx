const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
const upload = multer({ storage });

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
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

app.listen(5000, () => console.log("Server running on port 5000"));
