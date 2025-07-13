import React, { useState, useEffect } from 'react'
import { DashboardCards } from '../Pages/Common'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillAlt, FaMoneyBillWave, FaMoneyBillWaveAlt, FaTimesCircle, FaUser } from 'react-icons/fa'
import { sessiondata } from '../Context/Context';
import { CalendarIcon, BriefcaseIcon, CurrencyDollarIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';



const AdminSummarys = () => {

  const { user } = sessiondata();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className='p-6'>

      {user.role != 'user' && (
        <>
          <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <DashboardCards icons={<FaUser />} text="Total Employees" number={20} color="bg-teal-600" />
            <DashboardCards icons={<FaBuilding />} text="Total Department" number={2} color="bg-yellow-600" />
            <DashboardCards icons={<FaMoneyBillWave />} text="Monthly Salary" number={formatCurrency(15000)} color="bg-green-600" />

          </div>
        </>
      )}



      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
          <DashboardCards icons={<FaFileAlt />} text="Leave Applied" number={20} color="bg-teal-600" />
          <DashboardCards icons={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-yellow-600" />
          <DashboardCards icons={<FaHourglassHalf />} text="Leave Pending" number={15000} color="bg-green-600" />
          <DashboardCards icons={<FaTimesCircle />} text="Leave Rejected" number={15000} color="bg-red-600" />
        </div>
      </div>


      {/* {user.role !='user' && user.role !='Admin' && (
        <>
         <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <DashboardCards icons={<FaUser />} text="Total Employees" number={20} color="bg-teal-600"/>
            <DashboardCards icons={<FaBuilding />} text="Total Department" number={2} color="bg-yellow-600"/>
            <DashboardCards icons={<FaMoneyBillWave />} text="Monthly Salary" number={formatCurrency(15000)}  color="bg-green-600"/>
            
          </div>
        </>
      )}   */}

    </div>
  )
}


const AdminSummary = () => {
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch employee data
    setTimeout(() => {
      const data = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        jobTitle: 'Software Engineer',
        department: 'Engineering',
        salary: 65000,
        leaveDetails: {
          totalLeave: 30,
          pendingLeave: 5,
          rejectedLeave: 2,
        },
        tasks: [
          { id: 1, title: 'Finish project report', status: 'In Progress' },
          { id: 2, title: 'Update documentation', status: 'Completed' },
          { id: 3, title: 'Attend team meeting', status: 'Pending' },
        ],
      };
      setEmployeeData(data);
    }, 1000); // Simulate a delay for fetching data
  }, []);

  if (!employeeData) {
    return <div className="flex justify-center items-center min-h-screen"></div>;
  }

  return (
    < >
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Dashboard</h1>

        {/* Profile Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6 flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full border-4 border-blue-500"
              src="https://via.placeholder.com/150"
              alt="Employee Avatar"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{employeeData.name}</p>
            <p className="text-gray-600">{employeeData.jobTitle} - {employeeData.department}</p>
            <p className="text-gray-500">{employeeData.email}</p>
          </div>
        </div>

        {/* Leave Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Leave</p>
              <p className="text-xl font-semibold text-gray-800">{employeeData.leaveDetails.totalLeave} days</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <CalendarIcon className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Pending Leave Requests</p>
              <p className="text-xl font-semibold text-yellow-600">{employeeData.leaveDetails.pendingLeave} days</p>
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <CalendarIcon className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Rejected Leave Requests</p>
              <p className="text-xl font-semibold text-red-600">{employeeData.leaveDetails.rejectedLeave} days</p>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm flex items-center space-x-4">
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-xl font-semibold text-green-600">${employeeData.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Assigned Tasks</h2>
          <div className="space-y-4">
            {employeeData.tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{task.title}</span>
                  <span className={`text-sm ${task.status === 'Completed' ? 'text-green-500' : task.status === 'In Progress' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {task.status}
                  </span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminSummary
