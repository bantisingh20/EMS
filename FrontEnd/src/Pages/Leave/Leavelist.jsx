import React, { useEffect, useState } from 'react' ;
import { AppDataGrid, AppDataTable } from '../Common';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import loader from '../loader';
import { GetUserWiseLeaveData } from '../../api/LeaveApi';
import {useLocation} from 'react-router-dom';
import DataTable from '../../Components/DataTable';
//import {  DataGridPremium,  GridToolbarContainer,  GridToolbarExport,} from '@mui/x-data-grid-premium';

const columns = [
  {
    name: 'Sr.No',
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

const Leave =  () => {
 
  const location = useLocation();
  
  const [data,setdata]=useState([])
  const getData = async () => {
    try {      
     const request = await GetUserWiseLeaveData(location);
     setdata(request)

    } catch (error) {
      //console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
        <AppDataTable columns={columns} data={data} />
        
        <AppDataGrid columns={columns1} heading={'Leave Details'} data={data} />
        
    </>
  )
}
  

const columns1 = [
  { field: 'id', headerName: 'Sr.No', width: 70 },
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


// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

export default Leave
