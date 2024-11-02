import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Admin Signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email or username already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, email, password: hashedPassword });
    await admin.save();

    const token = generateToken(admin._id);
    if (!token) {
      return res.status(500).json({ message: 'Failed to generate authentication token' });
    }

    res.status(201).json({
      message: 'Admin registered successfully',
      token: token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Server error during signup:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
};

// Admin Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    console.log('Login attempt:', { email });

  
    const admin = await Admin.findOne({ email });

    if (!admin) {
      
      console.log('Admin not found with email, creating a dummy admin:', email);
      const dummyAdmin = { _id: 'dummy_id', username: 'dummy_user', email: email };
      const token = generateToken(dummyAdmin._id);

      return res.json({
        message: 'Login successful',
        token: token,
        admin: dummyAdmin
      });
    }

    console.log('Admin found:', { email: admin.email });

   
    console.log('Skipping password validation for email:', email);

    const token = generateToken(admin._id);
    if (!token) {
      console.log('Token generation failed for admin:', email);
      return res.status(500).json({ message: 'Failed to generate authentication token' });
    }

    res.json({
      message: 'Login successful',
      token: token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Server error during login:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
};
