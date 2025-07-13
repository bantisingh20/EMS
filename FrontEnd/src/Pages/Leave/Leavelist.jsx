import { GetUserWiseLeaveData } from '../../api/LeaveApi';
import MasterDataGridPage from '../MasterListPage';
 
const Leave = () => {


  return (
    <> 
      <MasterDataGridPage config={{
        title: 'Manage Leaves',
        fetchData: GetUserWiseLeaveData,
        getId: (row, index) => row._id,
        columns: [
          { field: 'id', headerName: 'Sr.No'},
          { field: 'employeeName', headerName: 'Employee Name' },
          { field: 'leaveType', headerName: 'Leave Type' },
          { field: 'fromDate', headerName: 'From Date'},
          { field: 'toDate', headerName: 'To Date'},
          { field: 'status', headerName: 'Status'},
          {
            field: 'reason',
            headerName: 'Reason',
             
            renderCell: (params) => (
              <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                {params.value}
              </div>
            ),
          },
         
        ],
        // addButton: {
        //   label: 'Apply Leave',
        //   onClick: (navigate) => navigate('/dashboard/role/submit')
        // },
        actions:true,
        rowActions: (row, navigate) => [  
          
          {
            label: 'Edit',
            color: 'primary',
            onClick: () => navigate(`/dashboard/leave/edit/${row.leaveid}`),
          },
          
        ],

      }} />

    </>
  )
}
 


export default Leave
