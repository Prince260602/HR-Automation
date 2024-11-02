import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData } from './utils/data/coursesData.jsx';

const EnrollForm = () => {
  const { id } = useParams();
  const course = coursesData.find((course) => course._id === id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile_number: '',
    college: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
  
    const dataToSubmit = {
      name: formData.fullName,
      email_id: formData.email,
      college: formData.college,
      mobile_number: formData.mobile_number,
      course: course.title,
    };
  
    try {
      const response = await fetch('https://ten-pap.onrender.com/a/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Capture error text
        console.error(`Error (${response.status}):`, errorText);
        alert(`Error (${response.status}): ${errorText}`);
        throw new Error(errorText);
      }
  
      const result = await response.json();
      console.log('Success:', result);
      navigate('/Admin/Agreement');
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white max-w-2xl w-full p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold my-4 text-purple-600">Enroll in {course.title}</h1>
        <form className="space-y-4" onSubmit={handleNext}>
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your Full Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your Email ID"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your Mobile number"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Course</label>
            <input
              type="text"
              value={course.title}
              readOnly
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">College Name</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your college name"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollForm;
