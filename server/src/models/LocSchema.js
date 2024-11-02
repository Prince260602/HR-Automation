import mongoose from "mongoose"

const LocSchema = new mongoose.Schema({
email: { 
    type: String, 
    required: true 
    },
    
  fullName: { 
    type: String, 
    required: true 
  },

  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'], 
    required: true 
  },

  collegeName: { 
    type: String 
  },

  courseName: { 
    type: String 
  },

  courseStatus: { 
    type: String, 
    enum: ['Pursuing', 'Completed'],
    required: true 
  },

  employeeId: { 
    type: String 
  },

 

  joiningDate: { 
    type: Date 
  },

  endDate: { 
    type: Date 
  },

  todaysDate: { 
    type: Date, 
    default: Date.now 
  },

  // Added missing fields
  documentNo: { 
    type: String 
  },  // For <<document no.>>
 

  profile: { 
    type: String, 
    required: true // For <<Profile>>
  },

  position: {
    type: String,
    required: true,
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

const Loc = mongoose.model('Loc', LocSchema);
export default Loc;
