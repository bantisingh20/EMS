import React from 'react' ;
import { AppDataTable } from '../Common';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Employee Name',
    selector: row => row.employeeName,
    sortable: true,
  },
  {
    name: 'Leave Type',
    selector: row => row.leaveType,
    sortable: true,
  },
  {
    name: 'From Date',
    selector: row => row.fromDate,
    sortable: true,
  },
  {
    name: 'To Date',
    selector: row => row.toDate,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
  },
  {
    name: 'Reason',
    selector: row => row.reason,
    
    sortable: true,
    wrap: true, 
    style: {
      whiteSpace: 'normal', // Ensure that the text wraps properly
      wordWrap: 'break-word', // Allow long words to break and fit into the column
      maxWidth: '300px', // Optional: set a max width for the column
    },
  },
];

const generateRandomLeaveData = (num) => {
  const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Lee"];
  const leaveTypes = ["Sick Leave", "Vacation", "Maternity Leave", "Personal Leave", "Public Holiday"];
  const statuses = ["Approved", "Pending", "Rejected"];
  const reasons = [
    "Personal health issues",
    "Family emergency i want leave at any how",
    "Vacation",
    "Medical treatment",
    "Religious holidays",
    "Public holidays"
  ];

  const randomLeaveData = [];

  for (let i = 0; i < num; i++) {
    const fromDate = new Date(
      Date.now() - Math.floor(Math.random() * 10000000000) // Random start date in the past
    ).toISOString().split('T')[0]; // Format date as yyyy-mm-dd
    const toDate = new Date(
      Date.now() - Math.floor(Math.random() * 10000000000) // Random end date in the past
    ).toISOString().split('T')[0]; // Format date as yyyy-mm-dd

    randomLeaveData.push({
      id: i + 1,
      employeeName: names[Math.floor(Math.random() * names.length)],
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      fromDate: fromDate,
      toDate: toDate,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
    });
  }

  return randomLeaveData;
};


const Leave = () => {

  const data = generateRandomLeaveData(20000); 

  return (
    <>
       <AppDataTable columns={columns} data={data} />

       <LeaveDataGrid />
    </>
  )
}

const columns1 = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'employeeName', headerName: 'Employee Name', width: 180 },
  { field: 'leaveType', headerName: 'Leave Type', width: 150 },
  { field: 'fromDate', headerName: 'From Date', width: 130 },
  { field: 'toDate', headerName: 'To Date', width: 130 },
  { field: 'status', headerName: 'Status', width: 120 },
  {
    field: 'reason',
    headerName: 'Reason',
    width: 300,
    renderCell: (params) => (
      <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
        {params.value}
      </div>
    ),
  },
];

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#00897b',  // Set the header background color
      color: 'white',              // Set the text color of header
      fontSize: '16px',            // Optional: adjust font size
      fontWeight: 'bold',          // Optional: make the text bold
    },
  },
  cells: {
    style: {
      fontSize: '14px',  // Set font size for table cells
    },
  },
};

const LeaveDataGrid = () => {
  const data = generateRandomLeaveData(10000); // Generate 10 random leave requests

  return (
    <Box sx={{ height: 'auto', width: 'auto' }}>
      
      <Typography variant="h6" gutterBottom>
        Leave Requests
      </Typography>
      <DataGrid
        columns={columns1}
        rows={data}
        pageSize={5} // Number of rows per page
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#00897b',  // Set background color for the header
            textAlign:'center',
            color: 'black',              // Set text color of header
            fontSize: '15px',            // Optional: adjust font size
            fontWeight: 'bold',          // Optional: make the header text bold
          },
          '& .MuiDataGrid-row': {
            // Set alternating background color for rows
            '&:nth-of-type(even)': {
              backgroundColor: '#f5f5f5', // Light background for even rows
            },
            '&:nth-of-type(odd)': {
              backgroundColor: '#e0f7fa', // Darker shade (or different color) for odd rows
            },
          },
          '& .MuiDataGrid-cell': {
            fontSize: '14px',  
          },
          
        }}
      />
    </Box>
  );
};


export default Leave
