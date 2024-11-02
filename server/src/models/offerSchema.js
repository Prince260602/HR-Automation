import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    EmployeeId: {
        type: String,
        required: true,
        unique: true
    },
    FullName: {
        type: String,
        required: true
    },
    JoiningDate: {
        type: Date,
        required: true
    },
    University: {
        type: String,
        required: true
    },
    InternshipDuration: { 
        type: String, 
        enum: ['3 Months', 'More than 3 Months'], 
        required: true 
      },
    AppliedProfile: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted','declined'], // Add other statuses if needed
        default: 'pending' // Default to 'pending'
      },
      

    createdAt: { 
        type: Date, 
        default: Date.now 
      }
});
 
const offerCollection = mongoose.model('Offer', OfferSchema  );

export default offerCollection;