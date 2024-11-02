import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    
    if (!id) {
      throw new Error('ID is required to generate a token');
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, { 
      expiresIn: '30d',
      // algorithm: 'HS256' // Explicitly specifying the algorithm
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
};

export default generateToken;

