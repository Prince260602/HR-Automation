// import React, { useState } from "react";
// import axios from "axios"

// const OfferLetterPage = () => {
  
//   const [formData, setFormData] = useState({
//     email: '',
//     PhoneNumber: '',
//     EmployeeId: '',
//     FullName: '',
//     JoiningDate: '',
//     University: '',
//     InternshipDuration: '',
//     AppliedProfile: '',
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (isSubmitted) return; // Prevent changes if the form is submitted
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const response = await axios.post("http://localhost:5500/api/offer/create", formData);
//       console.log("Response:", response.data);
//       setIsSubmitted(true);
//       alert("Form submitted successfully!"); // Show success alert
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Handle error (show error message to user)
//     }

//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-lg rounded-md">
//       <div className="text-3xl font-bold mb-4 text-center text-gray-600">Offer Letter</div>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
//           <input 
//           type="email" 
//           id="email" 
//           name="email" 
//           onChange={handleChange} 
//           disabled={isSubmitted} required 
//           placeholder="enter your email" 
//           className="mt-1 block w-full border 
//           border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//         </div>

//         <div>
//           <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">Phone No.:</label>
//           <input 
//           type="tel" 
//           id="PhoneNumber" 
//           name="PhoneNumber" 
//           onChange={handleChange} 
//           disabled={isSubmitted} 
//           placeholder="enter your phone no"
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//         </div>

//         <div>
//           <label htmlFor="EmployeeId" className="block text-sm font-medium text-gray-700">Employee ID:</label>
//           <input 
//           type="text" 
//           id="EmployeeId" 
//           name="EmployeeId" 
//           onChange={handleChange} 
//           disabled={isSubmitted} 
//           placeholder="enter your employee id"
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//         </div>

//         <div>
//           <label htmlFor="FullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
//           <input 
//           type="text" 
//           id="FullName" 
//           name="FullName" 
//           onChange={handleChange} 
//           disabled={isSubmitted} 
//           placeholder="enter your full name"
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//         </div>

//         <div>
//           <label htmlFor="JoiningDate" className="block text-sm font-medium text-gray-700">Joining Date:</label>
//           <input 
//           type="date" 
//           id="JoiningDate" 
//           name="JoiningDate" 
//           onChange={handleChange} 
//           disabled={isSubmitted}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//         </div>

//         <div>
//           <label htmlFor="University" className="block text-sm font-medium text-gray-700">University/College/School:</label>
//           <input 
//           type="text" 
//           id="University" 
//           name="University" 
//           onChange={handleChange} 
//           disabled={isSubmitted} 
//           placeholder="enter your University/College/School"
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Internship Duration:</label>
//           <div>
//             <label htmlFor="InternshipDuration" className="mt-1 block w-[50%]">
//               <input
//                 type="radio"
//                 value="3 Months"
//                 id="InternshipDuration"
//                 name="InternshipDuration"
//                 onChange={handleChange}
//                 disabled={isSubmitted}
//                 className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 "
//               />
//               <span className="ml-2"> 3 Months</span>
//             </label>
//             <label htmlFor="InternshipDuration" className="mt-1 block w-full">
//               <input
//                 type="radio"
//                 value="More than 3 Months"
//                 id="InternshipDuration"
//                 name="InternshipDuration"
//                 onChange={handleChange}
//                 disabled={isSubmitted}
//                 className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <span className="ml-2">More than 3 Months</span>
//             </label>


//           </div>

//         </div>

//         <div>
//           <label htmlFor="AppliedProfile" className="block text-sm font-medium text-gray-700">Profile you have applied for:</label>
//           <select id='AppliedProfile' name="AppliedProfile" onChange={handleChange} disabled={isSubmitted}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500">
//             <option value="">Select</option>
//             <option value='Human Resources'>Human Resources</option>
//             <option value='Mongo DB & QA Tester'>Mongo DB & QA Tester</option>
//             <option value='Scrum Master'>Scrum Master</option>
//             <option value='Graphic Designing'>Graphic Designing</option>
//             <option value='Digital Marketing'>Digital Marketing</option>
//             <option value="Mern Stack Developer">Mern Stack Developer</option>
//             <option value='>Mean Stack Developer'>Mean Stack Developer</option>
//             <option value='Content Writer'>Content Writer</option>
//             <option value='Business Analyst'>Business Analyst</option>
//             <option value='Finance'>Finance</option>
//             <option value='React JS'>React JS</option>
//             <option value='Other'>Other</option>
//           </select>
//           {formData.courseApplied === "Other" && (
//             <input type="text" id="otherCourseDetail" name="otherCourseApplied" disabled={isSubmitted} onChange={(e) => setFormData({ ...formData, courseApplied: e.target.value })} placeholder="Please specify" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//           )}
//         </div>

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             disabled={isSubmitted}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OfferLetterPage;
import React, { useState } from "react";
import axios from "axios";

const OfferLetterPage = () => {
  const initialFormData = {
    email: '',
    PhoneNumber: '',
    EmployeeId: '',
    FullName: '',
    JoiningDate: '',
    University: '',
    InternshipDuration: '',
    AppliedProfile: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isSubmitted) return; // Prevent changes if the form is submitted
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("https://ten-ivr.onrender.com/api/offer/create", formData);
      console.log("Response:", response.data);
      setIsSubmitted(true);
      alert("Form submitted successfully!");
      
      // Reset the form after submission
      setFormData(initialFormData);
      setIsSubmitted(false); // Optional: If you want to allow another submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-lg rounded-md">
      <div className="text-3xl font-bold mb-4 text-center text-gray-600">Offer Letter</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required placeholder="Enter your email" 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">Phone No.:</label>
          <input type="tel" id="PhoneNumber" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} placeholder="Enter your phone no" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label htmlFor="EmployeeId" className="block text-sm font-medium text-gray-700">Employee ID:</label>
          <input type="text" id="EmployeeId" name="EmployeeId" value={formData.EmployeeId} onChange={handleChange} placeholder="Enter your employee id" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label htmlFor="FullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input type="text" id="FullName" name="FullName" value={formData.FullName} onChange={handleChange} placeholder="Enter your full name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label htmlFor="JoiningDate" className="block text-sm font-medium text-gray-700">Joining Date:</label>
          <input type="date" id="JoiningDate" name="JoiningDate" value={formData.JoiningDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label htmlFor="University" className="block text-sm font-medium text-gray-700">University/College/School:</label>
          <input type="text" id="University" name="University" value={formData.University} onChange={handleChange} placeholder="Enter your University/College/School" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Internship Duration:</label>
          <div>
            <label htmlFor="InternshipDuration1" className="mt-1 block w-[50%]">
              <input
                type="radio"
                value="3 Months"
                id="InternshipDuration1"
                name="InternshipDuration"
                checked={formData.InternshipDuration === "3 Months"}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="ml-2"> 3 Months</span>
            </label>
            <label htmlFor="InternshipDuration2" className="mt-1 block w-full">
              <input
                type="radio"
                value="More than 3 Months"
                id="InternshipDuration2"
                name="InternshipDuration"
                checked={formData.InternshipDuration === "More than 3 Months"}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="ml-2">More than 3 Months</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="AppliedProfile" className="block text-sm font-medium text-gray-700">Profile you have applied for:</label>
          <select id='AppliedProfile' name="AppliedProfile" value={formData.AppliedProfile} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select</option>
            <option value='Human Resources'>Human Resources</option>
            <option value='Mongo DB & QA Tester'>Mongo DB & QA Tester</option>
            <option value='Scrum Master'>Scrum Master</option>
            <option value='Graphic Designing'>Graphic Designing</option>
            <option value='Digital Marketing'>Digital Marketing</option>
            <option value="Mern Stack Developer">Mern Stack Developer</option>
            <option value='Mean Stack Developer'>Mean Stack Developer</option>
            <option value='Content Writer'>Content Writer</option>
            <option value='Business Analyst'>Business Analyst</option>
            <option value='Finance'>Finance</option>
            <option value='React JS'>React JS</option>
            <option value='Other'>Other</option>
          </select>
          {formData.AppliedProfile === "Other" && (
            <input type="text" id="otherCourseDetail" name="otherCourseApplied" value={formData.otherCourseApplied} onChange={handleChange} placeholder="Please specify" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitted}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferLetterPage;

