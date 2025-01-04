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

 
import { AccessTime, CalendarToday, AssignmentTurnedIn } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Paper, CircularProgress } from '@mui/material';


const StatsPanel = () => {
  return (
    <div className="p-6">
      {/* Attendance Panel */}
      <Paper elevation={3} style={{ backgroundColor: '#38B2AC'}} className="bg-teal-500 text-white rounded-lg p-6 shadow-md mb-6">
        <Typography variant="h4" align="center" className="font-bold" style={{ fontFamily: 'serif', fontWeight: 'bold'}}>
          Attendance
        </Typography>
         
      </Paper>

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
            <CalendarToday className="text-teal-500 text-4xl mb-4" />
            <Typography variant="h6" className="font-semibold mb-2">
              Today's Activity
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Track your activities and attendance for today.
            </Typography>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="shadow-lg bg-white rounded-lg">
          <CardContent className="text-center p-6">
            <AssignmentTurnedIn className="text-teal-500 text-4xl mb-4" />
            <Typography variant="h6" className="font-semibold mb-2">
              Recent Activity
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Review your recent check-ins, check-outs, and more.
            </Typography>
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

  // Update the current time every minute (or you can set an interval to update)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  
  // Handle the punch-in action (for demonstration)
  const handlePunchIn = () => {
    const now = new Date();
    setPunchInTime(now);
    setIsPunchedIn(true);
  };

  const handlePunchOut = () =>{
    setIsPunchedIn(false);
  }

  // Calculate the difference between punch-in time and current time in minutes
  const calculateTimeDifference = () => {
    if (punchInTime) {
      const diff = Math.floor((currentTime - punchInTime) / 60000); // Time difference in minutes
      console.log(diff);
      return diff < 0 ? 0 : diff; 
    }
    return 0;
  };

  // Calculate percentage for the circular progress
  const calculateCircularProgressValue = () => {
    const maxTime = 480; // Let's assume 8 hours max work time (in minutes)
    const timeDiff = calculateTimeDifference();
    const progress = (timeDiff / maxTime) * 100; // Percentage progress
    return progress > 100 ? 100 : progress;
  };

  const progressValue = calculateCircularProgressValue();

  return (
    <div>
 
          <AccessTime className="text-teal-500 text-4xl mb-4" />
            <Typography variant="h6" className="font-extrabold">
              Timesheet Statistics
            </Typography>
            
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

          {/* Punch In Button */}

          {!isPunchedIn &&
          (
            <button
            onClick={handlePunchIn}
            className="bg-teal-500 text-white py-2 px-4 rounded-full text-sm"
          >
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </button>
          )
        }
         
        </CardContent>
      </Card>

      {/* Circular Tracker */}
      {isPunchedIn && (

        <>
           <div className="flex flex-col items-center space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Time Tracker</h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
       
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
              {`${calculateTimeDifference()} min`}
            </div>
          </div>

          {isPunchedIn &&
          (
            <button
            onClick={handlePunchOut}
            className="bg-red-500 text-white py-2 px-4 rounded-full text-sm"
          >
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </button>
          )
        }
        
        </div>
   
        </>
  
      )}
    </div>
  );
}; 
  


export default StatsPanel;




