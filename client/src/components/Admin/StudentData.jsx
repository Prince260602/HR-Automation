import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported correctly

function StudentData() {
  const [requests, setRequests] = useState([]); // State to hold the fetched data

  // Scroll to top when the component is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Function to fetch data from your API
  const fetchData = async () => {
    try {
      const response = await fetch('https://ten-ivr.onrender.com/api/requests'); // Replace with your API endpoint
      const data = await response.json();
      setRequests(data); // Set the fetched data into state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="py-10 mx-4 md:mx-11" id="Team">
      <div className="flex flex-col gap-6">
        {requests.map((item) => (
          <div
            className={`text-black p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start justify-between text-left bg-white border ${
              item.status === 'accepted'
                ? "border-green-500"
                : "border-red-500"
            } w-full max-w-3xl mx-auto`}
            key={item._id}
          >
            <div className="flex items-center mb-4 md:mb-0">
              {/* You might want to replace the imageURL and name fields with actual data */}
              <img
                src={item.imageURL || 'default_image_url'} // Fallback image if not available
                alt={item.name || 'User'} // Fallback name if not available
                className="rounded-full max-w-[80px] md:max-w-[100px] h-auto mr-4"
              />
              <div>
                 <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {item.fullname || 'No Name'}
                </h2>
                <p className="text-base md:text-lg font-medium">
                Emp_Id : {item.employeeId || 'Emp_Id'}
                </p>
                <p className="text-base md:text-lg font-medium">
                Form Type : {item.type === 'formSubmission' ? 'LOP' : item.type || 'Form-type'}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              {item.status === 'accepted' ? (
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm md:text-base">
                  ALREADY ACCEPTED!
                </div>
              ) : (
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm md:text-base">
                  DECLINED by HR!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentData;
