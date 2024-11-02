import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-lg bg-white text-black rounded overflow-hidden shadow-lg m-4">
      <div className="p-4">
        <img
          className="w-full h-auto max-w-full max-h-60 sm:max-h-48 md:max-h-56 lg:max-h-64 xl:max-h-72 object-cover border border-gray-400 rounded"
          src={course.imgSrc}
          alt={course.title}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold mb-2 text-purple-600" 
          style={{ fontSize: 'clamp(1.25rem, 4vw, 1.6rem)' }}>
          {course.title}
        </div>

        <p className="text-gray-800" 
          style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
          {course.description.substring(0, 100)}...
        </p>
      </div>
      <div className="px-6 pb-4 flex flex-row sm:flex-row justify-between items-center">
        <Link
          to={`/course/${course._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
        >
          Get this Course
        </Link>
        <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-xs sm:text-sm md:text-base font-semibold mt-2 sm:mt-0">
          {course.price === 0 ? 'Free' : `${course.price} Rs`}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
