import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { FiUsers, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


const API_URL = 'https://ten-ivr.onrender.com/api';
const API_URL2 = 'https://ten-ivr.onrender.com/api/requests';

function AdminPanel() {
  const [teamData, setTeamData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lorResponse = await axios.get(`${API_URL}/lor-requests`);
        const lopResponse = await axios.get(`${API_URL}/lop-requests`);
        const offerResponse = await axios.get(`${API_URL}/offer-letter-requests`);
        const locResponse = await axios.get(`${API_URL}/loc-requests`);

        const combinedData = [
          ...lorResponse.data.map(item => ({ ...item, type: 'LOR' })),
          ...lopResponse.data.map(item => ({ ...item, type: 'LOP' })),
          ...offerResponse.data.map(item => ({ ...item, type: 'Offer Letter' })),
          ...locResponse.data.map(item => ({ ...item, type: 'LOC' })),
        ];
        setTeamData(combinedData);
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error("Failed to fetch data from the server.");
      }
    };

    fetchData();
  }, []);

  const filteredCandidates = teamData.filter((item) => {
    const matchesSearchTerm =
      (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()));
  
    const matchesStatus =
      filterStatus === "all" || filterStatus === item.status;
  
    return matchesSearchTerm && matchesStatus;
  });

  const handleAccept = async (id, type) => {
    const formTypeMapping = {
      lor: 'lor',
      lop: 'formSubmission',
      'offer letter': 'offer-letter',
      loc: 'loc',
    };

    const formType = formTypeMapping[type.toLowerCase()] || type.toLowerCase();

    try {
      await axios.post(`${API_URL}/acceptForm`, {
        formId: id,
        formType,
      });

      const updatedTeamData = teamData.map((item) =>
        item._id === id ? { ...item, status: 'accepted' } : item
      );
      setTeamData(updatedTeamData);
      toast.success("Request accepted successfully!");
    } catch (error) {
      console.error("Error accepting request", error);
      toast.error("Failed to accept the request.");
    }
  };

  const handleDecline = async (id, type) => {
    try {
      await axios.delete(`${API_URL2}/${type.toLowerCase()}/${id}`);
      setTeamData(teamData.filter(item => item._id !== id));
      toast.info("Request declined successfully.");
    } catch (error) {
      console.error("Error deleting request", error);
      toast.error("Failed to decline the request.");
    }
  };

 
  const handleStatusChange = async (id, newStatus, requestType) => {
    try {
      await axios.patch(`${API_URL}/updateStatus`, {
        formId: id,
        newStatus,
        requestType,
      });

      const updatedTeamData = teamData.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      );
      setTeamData(updatedTeamData);
      toast.info("Status updated to pending.");
    } catch (error) {
      console.error("Error updating status", error);
      toast.error("Failed to update the status.");
    }
  };

  const statusCounts = {
    accepted: teamData.filter(item => item.status === 'accepted').length,
    pending: teamData.filter(item => item.status === 'pending').length,
    declined: teamData.filter(item => item.status === 'declined').length,
  };

  const pieData = {
    labels: ['Accepted', 'Pending', 'Declined'],
    datasets: [
      {
        data: [statusCounts.accepted, statusCounts.pending, statusCounts.declined],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  const barData = {
    labels: ['Accepted', 'Pending', 'Declined'],
    datasets: [
      {
        label: 'Number of Candidates',
        data: [statusCounts.accepted, statusCounts.pending, statusCounts.declined],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 overflow-x-auto">
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>

      <input
        type="text"
        placeholder="Search by Name or Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="all">All</option>
        <option value="accepted">Accepted</option>
        <option value="pending">Pending</option>
        <option value="declined">Declined</option>
      </select>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Status Distribution</h3>
          <div className="h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Status Overview</h3>
          <div className="h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((item) => (
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between" key={item._id}>
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.type === 'Offer Letter' ? item.FullName : item.fullName}
                  </h2>
                  <p className="text-gray-600">{item.email}</p>
                  <p className="text-sm text-gray-500">Type: {item.type}</p>
                  <p className="text-sm text-gray-500">Status: {item.status}</p>
                  <p className="text-sm text-gray-500">Applied On: {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  onClick={() => handleAccept(item._id, item.type)}
                >
                  <FiCheckCircle /> <span>Accept</span>
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  onClick={() => handleDecline(
                    item._id, 
                    item.type.toLowerCase() === 'lor' ? 'lor' : 
                    item.type.toLowerCase() === 'lop' ? 'lop' : 
                    item.type.toLowerCase() === 'offer letter' ? 'offer-letter' : 'loc'
                  )}
                >
                  <FiXCircle /> <span>Decline</span>
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  onClick={() => handleStatusChange(
                    item._id, 
                    'pending', 
                    item.type.toLowerCase() === 'lor' ? 'lor-requests' : 
                    item.type.toLowerCase() === 'lop' ? 'lop-requests' : 
                    item.type.toLowerCase() === 'offer letter' ? 'offer-letter-requests' : 'loc-requests'
                  )}
                >
                  <FiClock /> <span>Mark as Pending</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No candidates found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
