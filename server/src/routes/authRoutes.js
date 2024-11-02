import express from 'express';
import { signup, login } from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ message: 'Not authorized, no admin data' });
    }
    res.json({ 
      message: `Welcome, admin`,
      adminId: req.admin.id  // Assuming req.admin is an object with an id property
    });
  } catch (error) {
    console.error('Error in profile route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

