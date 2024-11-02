import React from "react";
import { useState } from "react";
import axios from "axios";

const NewCertificate = () => {
  const intialFormData = {
    email: "",
    fullName: "",
    gender: "",
    collegeName: "",
    courseName: "",
    courseStatus: "",
    employeeId: "",
    profile: "",
    position: "",
    joiningDate: "",
    endDate: "",
    todaysDate: "",
    otherRoleInput: "",
    otherPositionDetail: "",
  }
  const [formData, setFormData] = useState(intialFormData);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isSubmitted) return; // Prevent changes if the form is submitted
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://ten-ivr.onrender.com/api/loc/create",
        formData
      );
      console.log("Response:", response.data);
      setIsSubmitted(true);
      alert("Form submitted successfully!"); // Show success alert

      // Reset the form after submission
       setFormData(intialFormData);
       setIsSubmitted(false); // Optional: If you want to allow another submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-lg rounded-md">
      <div className="text-3xl font-bold mb-4 text-gray-600 text-center">
        Completion Certificate
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            disabled={isSubmitted}
            placeholder="Enter your email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
            disabled={isSubmitted}
            placeholder="Enter your full name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            disabled={isSubmitted}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium text-gray-700"
          >
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            onChange={handleChange}
            value={formData.employeeId}
            disabled={isSubmitted}
            placeholder="Enter your Employee ID"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="collegeName"
            className="block text-sm font-medium text-gray-700"
          >
            College Name:
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            onChange={handleChange}
            value={formData.collegeName}
            disabled={isSubmitted}
            placeholder="Enter your college name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-700"
          >
            Course Name:
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            onChange={handleChange}
            value={formData.courseName}
            disabled={isSubmitted}
            placeholder="Enter your course name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="courseStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Course Status:
          </label>
          <select
            id="courseStatus"
            name="courseStatus"
            onChange={handleChange}
            value={formData.courseStatus}
            disabled={isSubmitted}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Course Status</option>
            <option value="Pursuing">Pursuing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="profile"
            className="block text-sm font-medium text-gray-700"
          >
            Profile:
          </label>
          <select
            id="profile"
            name="profile"
            onChange={handleChange}
            value={formData.profile}
            disabled={isSubmitted}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Sales">Sales</option>
            <option value="Scrum Master">Scrum Master</option>
            <option value="General Management">General Management</option>
            <option value="Graphic Designing">Graphic Designing</option>
            <option value="Social Media Marketing">
              Social Media Marketing
            </option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Other">Other</option>
          </select>
          {formData.internshipRole === "Other" && (
            <input
              type="text"
              id="otherRoleInput"
              name="internshipRoleOther"
              disabled={isSubmitted}
              value={formData.otherRoleInput}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  internshipRoleOther: e.target.value,
                })
              }
              placeholder="Please specify"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position Worked:
          </label>
          <select
            id="position"
            name="position"
            disabled={isSubmitted}
            value={formData.position}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Position</option>
            <option value="Associate">Associate</option>
            <option value="Senior Associate">Senior Associate</option>
            <option value="Assistant Manager">Assistant Manager</option>
            <option value="Deputy Manager">Deputy Manager</option>
            <option value="Manager">Manager</option>
            <option value="Senior Manager">Senior Manager</option>
            <option value="Executive">Executive</option>
            <option value="Other">Other</option>
          </select>
          {formData.position === "Other" && (
            <input
              type="text"
              id="otherPositionDetail"
              name="positionWorkedOther"
              disabled={isSubmitted}
              value={formData.otherPositionDetail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  positionWorkedOther: e.target.value,
                })
              }
              placeholder="Please specify"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="joiningDate"
            className="block text-sm font-medium text-gray-700"
          >
            Joining Date:
          </label>
          <input
            type="date"
            id="joiningDate"
            name="joiningDate"
            value={formData.joiningDate}
            disabled={isSubmitted}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            disabled={isSubmitted}
            value={formData.endDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="todaysDate"
            className="block text-sm font-medium text-gray-700"
          >
            Today Date:
          </label>
          <input
            type="date"
            id="todaysDate"
            name="todaysDate"
            value={formData.todaysDate}
            onChange={handleChange}
            disabled={isSubmitted}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
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

export default NewCertificate;
