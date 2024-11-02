// server.js (or your relevant file)
import Loc from "../models/LocSchema.js";

// Route to handle form submission
export const createLoc =  async (req, res) => {
  const {
    email,
    fullName,
    gender,
    collegeName,
    courseName,
    courseStatus,
    employeeId,
    joiningDate,
    endDate,
    documentNo,
    profile,
    position,
    todaysDate
  } = req.body;

  // Create a new form submission instance
  const newLoc  = new Loc({
    email,
    fullName,
    gender,
    collegeName,
    courseName,
    courseStatus,
    employeeId,
    joiningDate,
    endDate,
    profile,
    position,
    documentNo,
    todaysDate
  });

  // Save to database
  try {
    await newLoc.save();
    res.status(201).send('Form submitted successfully.');
  } catch (error) {
    res.status(500).send('Error submitting form: ' + error.message);
  }
};