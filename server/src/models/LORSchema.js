import mongoose from 'mongoose';

const lorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], 
    required: true,
  },

  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseStatus: { 
    type: String, 
    enum: ['Pursuing', 'Completed'],
    required: true 
  },
  employeeID: {
    type: String,
    required: true,
    trim: true,
  },
  seniorName: {
    type: String,
    required: true,
    trim: true,
  },
  seniorContactNo: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  internshipRole: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  internshipDuration: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  experienceRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  todayDate: {
    type: Date,
    default: Date.now,
  },
  
  // profile: { 
  //   type: String, 
  //   required: true // For <<Profile>>
  // },

  // Added fields
  documentNo: { 
    type: String, 
  },
  
  pronoun: { 
    type: String, 
    enum: ['He', 'She'], 
  },

 
  status: {
    type: String,
    enum: ['pending', 'accepted'], // Add other statuses if needed
    default: 'pending' // Default to 'pending'
  },
  

  createdAt: { 
    type: Date, 
    default: Date.now 
  }

});

const LOR = mongoose.model('LOR', lorSchema);

export default LOR;
