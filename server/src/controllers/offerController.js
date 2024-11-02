// <<<<<<< HEAD
import Offer from "../models/offerSchema.js"
// =======
// controllers/offerController.js
// import Offer from '../models/offerSchema.js';
// >>>>>>> 2544373883d06dc74a943b597236fb3fd4561ef9

// Route to handle form submission
export const createOffer =  async (req, res) => {
  const {
    email,
    PhoneNumber,
    EmployeeId,
    FullName,
    InternshipDuration,
    JoiningDate,
    todaysDate,
    University,
    AppliedProfile
  } = req.body;
  
  // Create a new form submission instance
  const newOffer = new Offer({
    email,
    PhoneNumber,
    EmployeeId,
    FullName,
    InternshipDuration,
    JoiningDate,
    todaysDate,
    University,
    AppliedProfile
  });

  // Save to database
  try {
    await newOffer.save();
    res.status(201).send('Form submitted successfully.');
  } catch (error) {
    res.status(500).send('Error submitting form: ' + error.message);
  }
};




