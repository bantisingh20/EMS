import React from 'react'
import { DashboardCards } from '../Pages/Common'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillAlt, FaMoneyBillWave, FaMoneyBillWaveAlt, FaTimesCircle, FaUser } from 'react-icons/fa'

const AdminSummary = () => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount);
      };
      
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <DashboardCards icons={<FaUser />} text="Total Employees" number={20} color="bg-teal-600"/>
        <DashboardCards icons={<FaBuilding />} text="Total Department" number={2} color="bg-yellow-600"/>
        <DashboardCards icons={<FaMoneyBillWave />} text="Monthly Salary" number={formatCurrency(15000)}  color="bg-green-600"/>
        
      </div>

      <div className='mt-12'>
            <h4 className='text-center text-2xl font-bold'>Leave Details</h4> 
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                <DashboardCards icons={<FaFileAlt />} text="Leave Applied" number={20} color="bg-teal-600"/>
                <DashboardCards icons={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-yellow-600"/>
                <DashboardCards icons={<FaHourglassHalf />} text="Leave Pending" number={15000}  color="bg-green-600"/>
                <DashboardCards icons={<FaTimesCircle />} text="Leave Rejected" number={15000}  color="bg-red-600"/>
            </div>
      </div>
    </div>
  )
}

export default AdminSummary
