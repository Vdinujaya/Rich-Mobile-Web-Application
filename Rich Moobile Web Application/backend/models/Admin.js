const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'],
    trim: true
  },
  userName: { 
    type: String, 
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Invalid phone number format']
  },
  role: { 
    type: String, 
    default: 'admin',
    enum: ['admin', 'superadmin']
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Password hashing middleware
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate auth token
adminSchema.methods.generateAuthToken = async function() {
  const admin = this;
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your_dev_secret_123');
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

// Remove sensitive data
adminSchema.methods.toJSON = function() {
  const admin = this.toObject();
  delete admin.password;
  delete admin.tokens;
  return admin;
};

module.exports = mongoose.model('Admin', adminSchema);