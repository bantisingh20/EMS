// import React, { useEffect, useState } from "react";
// import { Button, Typography, Avatar } from "@mui/material";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // CheckCircle and Cancel icons from FontAwesome
// import { sessiondata } from "../../Context/Context";

// const CheckIn_OutTab = ({employeeCode,name,status,handleCheckInOut,role}) =>{
     
//     return(
//         <>
//          <div
//             key={employeeCode}
//             className={`p-4 m-4 ${role === "user" ? 'w-72 h-80' :'w-auto h-auto'}  bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-xl`}
//           >
//             {/* Display Profile Image  w-72 h-80 */}
//             <div className="flex justify-center mb-4">
//               <Avatar
//                 alt="Employee"
//                 src="https://via.placeholder.com/150"
//                 sx={{ width: 70, height: 70 }}
//               />
//             </div>

//             {/* Employee Info */}
//             <div className="flex flex-col items-center text-white">
//               <Typography variant="h6" className="font-bold mb-2">
//                 {employeeCode} - {name}
//               </Typography>
//               <Typography variant="body1" className="mb-4 flex p-1">
//                 {status === "in" ? (
//                   <>
//                    Status: In <FaCheckCircle className="mr-2 text-green-500" />
                    
//                   </>
//                 ) : (
//                   <>
//                    Status: Out <FaTimesCircle className="mr-2 text-red-500" />
                    
//                   </>
//                 )}
//               </Typography>
//               <Button
//                 variant="contained"
//                 color={status === "in" ? "secondary" : "primary"}
//                 onClick={handleCheckInOut}
//                 size="large"
//               >
//                 {status === "in" ? "Check Out" : "Check In"}
//               </Button>
//             </div>
//           </div>
//         </>
//     );
// }


// const EmployeeProfile = () => {  
    
//   const {user} = sessiondata();  
//   const employees = [
//     { employeeCode: "E123", name: "John Doe", status: "in" },
//     { employeeCode: "E124", name: "Jane Smith", status: "out" },
//     { employeeCode: "E125", name: "Michael Brown", status: "in" },
//   ];

//   // State to track check-in/check-out status (based on employee data)
//   const [isCheckedIn, setIsCheckedIn] = useState(
//     employees[0].status === "in"
//   );

//   // Handle Check-in/Check-out
//   const handleCheckInOut = () => {
//     setIsCheckedIn((prevStatus) => !prevStatus);
//   };

//   // If the user is a regular user, show their data
//   const employeeToDisplay = user.role === "user" ? employees[0] : employees;

//   return (
//     <div className="flex flex-wrap justify-center items-center bg-gray-100">
//       {/* Loop through employees and create a card for each */}
//       {Array.isArray(employeeToDisplay) ? (
//         employeeToDisplay.map((employee) => (
//             <CheckIn_OutTab employeeCode={employee.employeeCode} name={employee.name} status={employee.status} handleCheckInOut={handleCheckInOut} />
//         ))
//       ) : (
//         <CheckIn_OutTab employeeCode={employeeToDisplay.employeeCode} name={employeeToDisplay.name} status={employeeToDisplay.status} handleCheckInOut={handleCheckInOut} role={user.role} />
            
        
//       )}
//     </div>
//   );
// };

// export default EmployeeProfile;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { calculateCircularProgressValue, calculateHRSTimeDifference, calculateTimeDifference, GetEmployeePuchDetails, UserPunchIn, UserPunchOut } from '../../api/AttendenceApi';


const StatsPanel = () => {
  return (
    <div className="p-2">
      {/* Attendance Panel style={{ backgroundColor: '#38B2AC'}} */}
      <Paper elevation={3}  className="text-white rounded-lg shadow-md">
         
        <h2 className="text-3xl font-bold text-center text-black-800 bg-gradient-to-r from-teal-500 to-teal-300 p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
          Attendance
        </h2>
      </Paper>
      <br />
      {/* Cards Container */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {/* Timesheet Statistics Card */}
        <Card className="shadow-lg bg-white rounded-lg">
          <CardContent className="text-center p-6">            
              <TimesheetTab /> 
          </CardContent>
        </Card>

        {/* Today's Activity Card */}
        <Card className="shadow-lg bg-white rounded-lg">
          <CardContent className="text-center p-6">            
              <AttendanceStats /> 
          </CardContent>
        </Card>
 
      </Box>
    </div>
  );
}; 


const TimesheetTab = () => {
  const [punchInTime, setPunchInTime] = useState(null); // This will hold the punch-in time
  const [currentTime, setCurrentTime] = useState(new Date()); // Current time for comparison
  const [isPunchedIn, setIsPunchedIn] = useState(false); // Check if the user punched in
  
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = currentTime.toLocaleDateString('en-GB', options).replace(',', '').replace(' ', '.');

  const getPunchInData = async() =>{
    const getdetails = await GetEmployeePuchDetails();
    

     if(getdetails.data && getdetails.data[0].status == "Present"){
      //console.log(`Punchin Time : ${getdetails.data[0].inTime}`)

      const time = getdetails.data[0].inTime;
      const date = new Date(time);
  
      //console.log(date);
       setPunchInTime(date);
       setIsPunchedIn(true);
      // console.log(`var time : ${punchInTime}`);

     
     }
     
  }

  
  useEffect(() => {
    
    getPunchInData();
   
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup interval on component unmount


  }, []);
  
  // Handle the punch-in action (for demonstration)
  const handlePunchIn = async () => {
    const now = new Date();
    const response = await UserPunchIn(now); 
    
    setPunchInTime(now);
    setIsPunchedIn(true);
  };

  const handlePunchOut = async () =>{   
    const punchout = await UserPunchOut(currentTime,punchInTime)
    setIsPunchedIn(false);
  }

  const progressValue = calculateCircularProgressValue(punchInTime,currentTime);

  const PunchButton = () =>{
    return (
      <button
      onClick={isPunchedIn ? handlePunchOut : handlePunchIn}
        className=  {`${!isPunchedIn ? 'bg-teal-500 text-white py-2 px-4 rounded-full text-sm transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50' : 'bg-red-500 text-white py-2 px-4 rounded-full text-sm'}`}
      >
        {isPunchedIn ? 'Punch Out' : 'Punch In'}
      </button>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-xs mx-auto">
         
     <div className='flex justify-between'>
      <h2 className="text-teal-500 text-xl font-bold mb-4">TimeSheet</h2>
      <p className="text-sm text-gray-500">{formattedDate}</p>
     </div>
       {/* Punch-In Status */}
      <Card className="shadow-lg bg-white rounded-lg mb-6">
        <CardContent className="text-center p-6">
           
          {isPunchedIn ? (
            <Typography variant="body2" className="mb-4 text-gray-600">
              <spam className='text-black font-bold'>Punch In at :</spam> {currentTime.toLocaleDateString('en-GB', options).replace(',', '').replace('.', '.')} {punchInTime.toLocaleTimeString()}
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary" className="mb-4 text-black">
              You have not punched in yet.
            </Typography>
          )}

          {!isPunchedIn && <PunchButton />}
         
        </CardContent>
      </Card>

      {/* Circular Tracker */}
      {isPunchedIn && (

        <>
          <div className="flex flex-col items-center space-y-4 p-6">
       
          {/* Circular Progress */}
          <div className="relative flex items-center justify-center">
            <svg
              className="w-32 h-32"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-gray-300"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="M18 2.0845 a 15.915 15.915 0 0 1 0 31.831 a 15.915 15.915 0 0 1 0 -31.831"
              ></path>
              <path
                className="text-blue-500"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="100, 100"
                strokeDashoffset={100 - progressValue}
                d="M18 2.0845 a 15.915 15.915 0 0 1 0 31.831 a 15.915 15.915 0 0 1 0 -31.831"
              ></path>
            </svg>
            

            {/* Progress Percentage */}
            <div className="absolute text-xl font-semibold">
              {/* {Math.floor(progressValue)}% */}
              {`${calculateHRSTimeDifference(punchInTime,currentTime)}`}
            </div>
          </div>

          {/* {isPunchedIn &&
          (
            <button
            onClick={handlePunchOut}
            className="bg-red-500 text-white py-2 px-4 rounded-full text-sm"
          >
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </button>
          )
        } */}
        {isPunchedIn && <PunchButton />}

        </div>
   
        </>
  
      )}
    </div>
  );
}; 
  

const AttendanceStats = () => {
  // Example Data (replace with actual data from your API)
  const todayPresentHours = 3.45;
  const todayTotalHours = 8;
  const thisWeekTotalHours = 28;
  const thisWeekPossibleHours = 40;
  const thisMonthTotalHours = 160;
  const thisMonthPossibleHours = 180;
  const overtimeThisMonth = 20;
  const overtimePossibleHours = 30;

  const Statisticsvalue= [
    {
      name:'Today',
      present:3.75,
      Total : 8,
    },
    {
      name:'This Week',
      present:28,
      Total : 40,
    },
    {
      name:'This Month',
      present: 160,
      Total : 180,
    },
    {
      name:'OverDue',
      present:20,
      Total : 1,
    }
]
  // Function to calculate the percentage of the progress
  const calculatePercentage = (currentValue, maxValue) => {
    return (currentValue / maxValue) * 100;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-xs mx-auto">
      <h2 className="text-teal-500 text-xl font-bold mb-4">Attendance Statistics</h2>

      {/* Today's Attendance Panel */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
        <div className='flex justify-between'>
          <h3 className="text-sm font-semibold">Today</h3>
          <p className="text-gray-700 text-sm">
            {todayPresentHours.toFixed(2)}/{todayTotalHours} hrs
          </p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-teal-500 h-2 rounded-full"
            style={{ width: `${calculatePercentage(todayPresentHours, todayTotalHours)}%` }}
          ></div>
        </div>
      </div>

      {/* This Week's Attendance Panel */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
      <div className='flex justify-between'>
        <h3 className="text-sm font-semibold">This Week</h3>
        <p className="text-gray-700 text-sm">
          {thisWeekTotalHours}/{thisWeekPossibleHours} hrs
        </p>
      </div>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${calculatePercentage(thisWeekTotalHours, thisWeekPossibleHours)}%` }}
          ></div>
        </div>
      </div>

      {/* This Month's Attendance Panel */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
      <div className='flex justify-between'>
         <h3 className="text-sm font-semibold">This Month</h3>
        <p className="text-gray-700 text-sm">
          {thisMonthTotalHours}/{thisMonthPossibleHours} hrs
        </p>
      </div>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: `${calculatePercentage(thisMonthTotalHours, thisMonthPossibleHours)}%` }}
          ></div>
        </div>
      </div>

      {/* Overtime Panel */}
      <div className="p-3 bg-white rounded-lg shadow-sm">
      <div className='flex justify-between'>
        <h3 className="text-sm font-semibold">Overtime This Month</h3>
        <p className="text-gray-700 text-sm">
          {overtimeThisMonth}/{overtimePossibleHours} hrs
        </p>
      </div>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-yellow-500 h-2 rounded-full"
            style={{ width: `${calculatePercentage(overtimeThisMonth, overtimePossibleHours)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;




