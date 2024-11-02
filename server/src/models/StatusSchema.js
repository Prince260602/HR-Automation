import mongoose from "mongoose"

// Common request schema for LOR, LOC, Offer Letters
const StatusSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    trim: true,
  },
  EmployeeId: {
    type: String,
    trim: true,
  },
  fullname: {
    type: String,
    
  },
  
  type: {
    type: String,
    enum: ['lor', 'lop', 'offer-letter','loc','formSubmission'], // Type of request
    required: true
  },
  status: {
    type: String,
    enum: [ 'accepted', 'declined'], // Request status
      // Start as pending by default
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Middleware to automatically update `updatedAt` before save
StatusSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const ReqSchema = mongoose.model('ReqSchema', StatusSchema);
export default ReqSchema;

