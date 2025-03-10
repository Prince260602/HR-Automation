import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"

// Define Zod schema for form validation
const schema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  collegeName: z.string().min(1, "College name is required"),
  courseName: z.string().min(1, "Course name is required"),
  courseStatus: z.string().min(1, "Course status is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  seniorName: z.string().min(1, "Senior's name is required"),
  seniorContactNo: z.string().min(1, "Senior's contact number is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  previousJobRole: z.string().min(1, "Previous job role is required"),
  positionPromotedTo: z.string().min(1, "Position promoted to is required"),
  internshipDuration: z.string().min(1, "Internship duration is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  endDate: z.string().min(1, "End date is required"),
  todaysDate: z.string().min(1, "Today's date is required"),
});

const PromotionForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(formData) => {
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:5500/api/lop/submit-form", formData);
      console.log("Response:", response.data);
      setIsSubmitted(true);
      alert("Form submitted successfully!"); // Show success alert
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-lg rounded-md mt-10">
      <div className="text-3xl font-bold mb-4 text-center text-gray-600">Letter of Promotion</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto">

        <div>
          <label htmlFor="email" className="block  font-medium text-mm text-gray-700">Email :</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            disabled={isSubmitted}
            placeholder="example@gmail.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-mm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="fullName" className="block text-mm font-medium text-gray-700">Full Name :</label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            disabled={isSubmitted}
            placeholder="Enter your First & Last name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        <div>
          <label htmlFor="mobileNumber" className="block ttext-mm font-medium text-gray-700">Contact No :</label>
          <input
            type="number"
            id="mobileNumber"
            {...register("mobileNumber")}
            disabled={isSubmitted}
            placeholder="Numerical"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-mm font-medium text-gray-700">Gender :</label>
          <div className="mt-1 flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="gender"
                value="Male"
                {...register("gender")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="gender"
                value="Female"
                {...register("gender")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="gender"
                value="other"
                {...register("gender")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Prefer not to say</span>
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-mm">{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="collegeName" className="block text-mm font-medium text-gray-700">College Name :</label>
          <input
            type="text"
            id="collegeName"
            {...register("collegeName")}
            disabled={isSubmitted}
            placeholder="Enter your College Name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.collegeName && <p className="text-red-500 text-sm">{errors.collegeName.message}</p>}
        </div>

        <div>
          <label htmlFor="courseName" className="block text-mm font-medium text-gray-700">Course Name :</label>
          <input
            type="text"
            id="courseName"
            {...register("courseName")}
            disabled={isSubmitted}
            placeholder="Enter your Course Name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.courseName && <p className="text-red-500 text-mm">{errors.courseName.message}</p>}
        </div>

        <div>
          <label htmlFor="courseStatus" className="block text-mm font-medium text-gray-700">Course Status :</label>
          <div className="mt-1 flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="courseStatus"
                value="Pursuing"
                {...register("courseStatus")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Pursuing</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="courseStatus"
                value="Completed"
                {...register("courseStatuss")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Completed</span>
            </label>
          </div>
          {errors.courseStatus && <p className="text-red-500 text-mm">{errors.courseStatus.message}</p>}
        </div>

        <div>
          <label htmlFor="employeeId" className="block text-mm font-medium text-gray-700">Employee ID ( Check Your Offer Letter And Provide Correct Employee ID ) :</label>
          <input
            type="text"
            id="employeeId"
            {...register("employeeId")}
            disabled={isSubmitted}
            placeholder="Enter your Correct Employee Id"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.employeeId && <p className="text-red-500 text-mm">{errors.employeeId.message}</p>}
        </div>

        <div>
          <label htmlFor="seniorName" className="block text-mm font-medium text-gray-700">Name Of Your Senior Under Whom You have Worked ? :</label>
          <input
            type="text"
            id="seniorName"
            {...register("seniorName")}
            disabled={isSubmitted}
            placeholder="Enter Name of Senior"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.seniorName && <p className="text-red-500 text-sm">{errors.seniorName.message}</p>}
        </div>

        <div>
          <label htmlFor="seniorContactNo" className="block text-mm font-medium text-gray-700">Contact No. Of Your Senior Under Whom You have Worked :</label>
          <input
            type="number"
            id="seniorContactNo"
            {...register("seniorContactNo")}
            disabled={isSubmitted}
            placeholder="Enter Contact Detail of Senior"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.seniorContactNo && <p className="text-red-500 text-mm">{errors.seniorContactNo.message}</p>}
        </div>

        <div>
          <label htmlFor="previousJobRole" className="block text-mm font-medium text-gray-700">Previous Job Role :</label>
          <div className="mt-1 flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="previousJobRole"
                value="Junior Developer"
                {...register("previousJobRole")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Junior Developer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="previousJobRole"
                value="Senior Developer"
                {...register("previousJobRole")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Senior Developer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="previousJobRole"
                value="Team Lead"
                {...register("previousJobRole")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Team Lead</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="previousJobRole"
                value="Manager"
                {...register("previousJobRole")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Manager</span>
            </label>
          </div>
          {errors.previousJobRole && <p className="text-red-500 text-mm">{errors.previousJobRole.message}</p>}
        </div>

        <div>
          <label htmlFor="positionPromotedTo" className="block text-mm font-medium text-gray-700">Position Promoted To :</label>
          <div className="mt-1 flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="positionPromotedTo"
                value="HR Associate"
                {...register("positionPromotedTo")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">HR Associate</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="positionPromotedTo"
                value="Senior Associate"
                {...register("positionPromotedTo")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Senior Associate</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="positionPromotedTo"
                value="Team Lead"
                {...register("positionPromotedTo")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Team Lead</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="positionPromotedTo"
                value="Manager"
                {...register("positionPromotedTo")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Manager</span>
            </label>
          </div>
          {errors.positionPromotedTo && <p className="text-red-500 text-mm">{errors.positionPromotedTo.message}</p>}
        </div>


        <div>
          <label htmlFor="internshipDuration" className="block ttext-mm font-medium text-gray-700">Internship Duration :</label>
          <div className="mt-1 flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="internshipDuration"
                value="4 months"
                {...register("internshipDuration")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">4 Months</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="internshipDuration"
                value="5 months"
                {...register("internshipDuration")}
                disabled={isSubmitted}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">5 Months</span>
            </label>
          </div>
          {errors.internshipDuration && <p className="text-red-500 text-mm">{errors.internshipDuration.message}</p>}
        </div>

        <div>
          <label htmlFor="joiningDate" className="block text-mm font-medium text-gray-700">Joining Date :</label>
          <input
            type="date"
            id="joiningDate"
            {...register("joiningDate")}
            disabled={isSubmitted}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.joiningDate && <p className="text-red-500 text-mm">{errors.joiningDate.message}</p>}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-mm font-medium text-gray-700">End Date :</label>
          <input
            type="date"
            id="endDate"
            {...register("endDate")}
            disabled={isSubmitted}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.endDate && <p className="text-red-500 text-mm">{errors.endDate.message}</p>}
        </div>

        <div>
          <label htmlFor="todaysDate" className="block text-mm font-medium text-gray-700">Today's Date :</label>
          <input
            type="date"
            id="todaysDate"
            {...register("todaysDate")}
            disabled={isSubmitted}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.todaysDate && <p className="text-red-500 text-mm">{errors.todaysDate.message}</p>}
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

export default PromotionForm;