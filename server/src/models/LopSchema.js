import mongoose from "mongoose"

const formSubmissionSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  
  fullName: { 
    type: String, 
    required: true 
  },
  
  mobileNumber: { 
    type: String, 
  },

  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'], 
    required: true 
  },

  collegeName: { 
    type: String ,
    required: true
  },

  courseName: { 
    type: String 
  },

  courseStatus: { 
    type: String, 
    enum: ['Pursuing', 'Completed'],
  },

  employeeId: { 
    type: String,
  },

  // nameOfSenior: { 
  //   type: String 
  // },

  previousJobRole: { 
    type: String, 
    enum: ['Junior Developer', 'Senior Developer', 'Team Lead', 'Manager', ], 
    required: true 
  },

  positionPromotedTo: { 
    type: String, 
    enum: ['HR Associate', 'Senior Associate', 'Team Lead', 'Manager', ], 
    required: true 
  },

  internshipDuration: { 
    type: String, 
    enum: ['4 months', '5 months'], 
    required: true 
  },

  joiningDate: { 
    type: Date 
  },

  endDate: { 
    type: Date 
  },

  todayDate: { 
    type: Date, 
    default: Date.now 
  },

  // Added missing fields
  documentNo: { 
    type: String 
  },  // For <<document no.>>

  effectiveDate: { 
    type: Date 
  },  // For <<effective date>>

 
  status: {
    type: String,
    enum: ['pending', 'accepted'], // Add other statuses if needed
    default: 'pending' // Default to 'pending'
  },
  

  certificate: { 
    type: String 
  },
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
// New changes as per frontend code 
  seniorName: {
    type: String
  },

  seniorContactNo: {
    type: String
  },

});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
export default FormSubmission;
