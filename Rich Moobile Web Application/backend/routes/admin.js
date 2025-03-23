const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_dev_secret_123';

// Admin Registration
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;
    
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { userName }] });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const admin = new Admin({ firstName, lastName, userName, email, password, phone });
    await admin.save();
    const token = await admin.generateAuthToken();
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = await admin.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Logout
router.post('/logout', async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter(token => token.token !== req.token);
    await req.admin.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;