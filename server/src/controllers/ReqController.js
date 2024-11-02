import LORRequest from '../models/LORSchema.js';
import offerRequest from "../models/offerSchema.js"
// <<<<<<< HEAD
import LocRequest from '../models/LocSchema.js';
import ReqSchema from '../models/StatusSchema.js';
// =======
// >>>>>>> 2544373883d06dc74a943b597236fb3fd4561ef9
import FormSubmission from "../models/LopSchema.js";
import generatePDF from '../pdfGenerator.js';
import sendEmail from "../emailSender.js"
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from 'console';

// import OfferLetterRequest from '../models/OfferLetterRequest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfDir = path.join(__dirname, 'certificates');

// Ensure the certificates directory exists
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Function to get LOR requests
export const getLORRequests = async (req, res) => {
  try {
    const lorRequests = await LORRequest.find();
    res.status(200).json(lorRequests);
    console.log(lorRequests);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get LOP requests
export const getLOPRequests = async (req, res) => {
  try {
    const lopRequests = await FormSubmission.find();
    res.status(200).json(lopRequests);
    console.log(lopRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get Offer Letter requests
export const getOfferLetterRequests = async (req, res) => {
  try {
    const offerLetterRequests = await offerRequest.find();
    res.status(200).json(offerLetterRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get LOC requests
export const getLOCRequests = async (req, res) => {
  try {
    const locRequests = await LocRequest.find();
    res.status(200).json(locRequests);
    console.log(locRequests);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to delete a request (decline)
export const deleteRequest = async (req, res) => {
  const { type, id } = req.params;

  try {
    let formDetails;

    // Fetch the form details from the respective collection
    switch (type) {
      case 'lor':
        formDetails = await LORRequest.findById(id);
        break;
      case 'lop':
        formDetails = await FormSubmission.findById(id);
        break;
      case 'offer-letter':
        formDetails = await offerRequest.findById(id);
        break;
      case 'loc':
        formDetails = await LocRequest.findById(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid request type' });
    }

    if (!formDetails) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Save data to the common Request schema
    const requestData = new ReqSchema({
      employeeId: formDetails.employeeId || formDetails.EmployeeId,
      fullname: formDetails.fullname || formDetails.Fullname ||formDetails.FullName ||formDetails.fullName, // Depending on the naming used in the form
      type: type, // Type of request (lor, lop, offer-letter, loc)
      status: 'declined', // Since the request is being declined/deleted
      createdAt: formDetails.createdAt,
    });
    await requestData.save(); // Save in the Request schema

    // Permanently delete the request from the original collection
    switch (type) {
      case 'lor':
        await LORRequest.findByIdAndDelete(id);
        break;
      case 'lop':
        await FormSubmission.findByIdAndDelete(id);
        break;
      case 'offer-letter':
        await offerRequest.findByIdAndDelete(id);
        break;
      case 'loc':
        await LocRequest.findByIdAndDelete(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid request type' });
    }

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



  // form acceptance from admin

  export const acceptRequest = async (req, res) => {
    const { formId, formType } = req.body;
  
    console.log(formType);
    
    let formDetails;
    try {
      // Fetch the request details based on the form type
      if (formType === "formSubmission") {
        formDetails = await FormSubmission.findById(formId);
      } else if (formType === "lor") {
        formDetails = await LORRequest.findById(formId);
      } else if (formType === "offer-letter") {
        console.log("Entered into offer letter");
        formDetails = await offerRequest.findById(formId);
      } else if (formType === "loc") {
        console.log("Entered into LOC");
        formDetails = await LocRequest.findById(formId);
      } else {
        return res.status(400).send("Invalid form type");
      }
  
      if (!formDetails) {
        return res.status(404).send("Form not found");
      }
  
      // Update the status to "accepted"
      formDetails.status = 'accepted';
      await formDetails.save(); // Save the updated status
  
      // Store accepted request in the common Request schema
      const requestData = new ReqSchema({
        employeeId: formDetails.employeeId || formDetails.EmployeeId,
        fullname: formDetails.fullname || formDetails.Fullname ||formDetails.FullName ||formDetails.fullName, // Depending on the naming used in the form
        type: formType, // Type of request (lor, lop, offer-letter, loc)
        status: 'accepted', // Since the request is being accepted
        createdAt: formDetails.createdAt,
      });
      await requestData.save(); // Save in the Request schema
  
      // Generate PDF
      const pdfPath = path.join(__dirname, 'certificates', `${formId}.pdf`);
      await generatePDF(formDetails, pdfPath, formType); // Pass formType here
  
      // Ensure PDF was created before sending email
      if (!fs.existsSync(pdfPath)) {
        return res.status(500).send('Error: PDF file not found');
      }
  
      // Prepare email details
      const emailText = 'Dear user, attached is your certificate. Please download and share it.';
      const recipientEmail = formDetails.email; // Get the recipient's email from form details
      console.log("Entered into:", recipientEmail);
  
      // Send email
      await sendEmail(recipientEmail, 'Your Certificate', emailText, pdfPath);
      res.status(200).send('Certificate sent successfully');
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).send('Error processing request');
    }
  };
  



  export const getAllRequests = async (req, res) => {
    console.log("getAllRequests called"); // Debug log
    try {
        const requests = await ReqSchema.find();
        console.log(requests);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

