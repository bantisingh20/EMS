import React, { useState } from 'react';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaPlus } from 'react-icons/fa';
import LeaveForm from './LeaveForm';
import { useNavigate, useLocation } from 'react-router-dom';
import Leave from './Leavelist';

// Mock data for leave types
const leaveData = [
  {
    type: 'Sick Leave',
    total: 15,
    pending: 5,
    booked: 10,
    icon: <FaHourglassHalf className="w-8 h-8 text-yellow-500" />,
  },
  {
    type: 'Privilege Leave',
    total: 20,
    pending: 3,
    booked: 17,
    icon: <FaCheckCircle className="w-8 h-8 text-green-500" />,
  },
  {
    type: 'Leave Without Pay',
    total: 10,
    pending: 2,
    booked: 8,
    icon: <FaTimesCircle className="w-8 h-8 text-red-500" />,
  }
];

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  
  const handleAddClick = () => {
    navigate('/dashboard/leaves/apply-leave')
   };

  const handleCloseForm = () => { 
    setShowForm(false);
  };

  return (
    <>
      <div className="bg-gray-50 flex items-center justify-center relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl p-6">
        {leaveData.map((leave, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4"
          >
            <div className="flex justify-center items-center space-x-4">
              {leave.icon}
              <h2 className="text-xl font-semibold">{leave.type}</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Total Leave:</span>
                <span className="text-blue-600">{leave.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Pending Leave:</span>
                <span className="text-yellow-600">{leave.pending}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Booked Leave:</span>
                <span className="text-green-600">{leave.booked}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddClick}
        className="absolute bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FaPlus className="w-6 h-6" />
      </button>
 
    </div>

      <Leave />
    </>
  );
};

export default LandingPage;
