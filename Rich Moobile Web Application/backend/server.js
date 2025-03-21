const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('./models/Admin');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Configuration
const DB_URL = "mongodb+srv://5thDimension:5thDimension@richmobile.o6bgx.mongodb.net/RichMobileDB?retryWrites=true&w=majority&appName=RichMobile";
const JWT_SECRET = 'your_dev_secret_123';

mongoose.connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Authentication Middleware
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await mongoose.model('Admin').findOne({
      _id: decoded.id,
      $or: [
        { 'tokens.token': token },  // For new admins
        { token: token }            // For old admins (backward compatibility)
      ]
    });

    if (!admin) throw new Error();
    
    req.admin = admin;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Routes Configuration
const adminRoutes = require('./routes/admin');
const itemRoutes = require('./routes/item');
const customerRoutes = require('./routes/customer');
const feedbackRoutes = require('./routes/feedback');

// Main routes
app.use(itemRoutes);          // Preserve existing item routes
app.use(customerRoutes);      // Preserve existing customer routes
app.use(feedbackRoutes);      // Preserve existing feedback routes
app.use('/api/admin', adminRoutes);

// Protected Admin Routes (combining old and new)
app.get('/api/admin/verify-token', adminAuth, (req, res) => {
  res.json({ 
    valid: true,
    admin: {
      ...req.admin.toObject(),
      // Backward compatibility for old admin properties
      userName: req.admin.userName || req.admin.email
    }
  });
});

app.get('/api/admin/dashboard', adminAuth, (req, res) => {
  res.json({ 
    message: `Welcome admin ${req.admin.userName || req.admin.email}`,
    admin: req.admin
  });
});

// Existing Profile Routes (preserved from previous version)
app.get('/api/admin/me', adminAuth, async (req, res) => {
  try {
    const admin = await mongoose.model('Admin').findById(req.admin.id)
      .select('-password -tokens -__v');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/me', adminAuth, async (req, res) => {
  try {
    const { password, confirmPassword, ...updateData } = req.body;
    
    if (password) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await mongoose.model('Admin').findByIdAndUpdate(
      req.admin.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -tokens -__v');

    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/admin/me', adminAuth, async (req, res) => {
  try {
    await mongoose.model('Admin').findByIdAndDelete(req.admin.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server Initialization
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});