// import React, { useEffect, useState } from 'react';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { AppDataGrid } from './Common';

// const MasterDataGridPage = ({ config }) => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [pending, setPending] = useState(true);

//   const fetchData = async () => {
//     setPending(true);
//     try {
//       const res = await config.fetchData();
//       setData(res.success ? res.data : []);
//     } catch (err) {
//       console.error('Fetch Error:', err);
//     }
//     setPending(false);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this entry?')) {
//       try {
//         await config.deleteData(id);
//         fetchData();
//       } catch (err) {
//         console.error('Delete Error:', err);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const columns = [ 
//     ...(config.columns || []),
//     {
//       field: 'actions',
//       headerName: 'Action',
//       renderCell: (params) => {
//         const row = params.row;
//         const buttons = config.rowActions?.(row, navigate, handleDelete) || [];
//         return (
//           <div style={{ display: 'flex', gap: 8 }}>
//             {buttons.map((btn, i) => (
//               <Button
//                 key={i}
//                 variant="contained"
//                 color={btn.color || 'primary'}
//                 size="small"
//                 sx={{ minWidth: 60, padding: '4px 8px', fontSize: '0.7rem' }}
//                 onClick={btn.onClick}
//               >
//                 {btn.label}
//               </Button>
//             ))}
//           </div>
//         );
//       },
//       sortable: false,
//       width: 160
//     }
//   ];

//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <AppDataGrid
//         heading={config.title || 'Manage Records'}
//         columns={columns}
//         data={data.map((item) => ({ ...item, id: config.getId?.(item) || item.id }))}
//         loading={pending}
//         showHeaderButton={!!config.addButton}
//         headerButtonProps={{
//           label: config.addButton?.label || 'Add New',
//           onClick: () => config.addButton?.onClick(navigate)
//         }}
//       />
//     </div>
//   );
// };

// export default MasterDataGridPage;

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDataGrid } from './Common';

const MasterDataGridPage = ({ config }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const [page, setPage] = useState(0); // 0-based for MUI
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (page = 0, limit = 10) => {
    setPending(true);
    try {
      const res = await config.fetchData({ page: page + 1, limit }); // API expects 1-based
      console.log('API Response:', res);
      if (res.success) {
        console.log('Fetched Data:', res.data);
        console.log('Pagination:', res.pagination);
        setData(res.data || []);
        setTotalRows(res.pagination?.total || 0);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    }
    setPending(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await config.deleteData(id);
        fetchData(page, pageSize);
      } catch (err) {
        console.error('Delete Error:', err);
      }
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const columns = [
  ...(config.columns || []),

  ...(config.actions ? [
    {
      field: 'actions',
      headerName: 'Action',
      renderCell: (params) => {
        const row = params.row;
        const buttons = config.rowActions?.(row, navigate, handleDelete) || [];
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            {buttons.map((btn, i) => (
              <Button
                key={i}
                variant="contained"
                color={btn.color || 'primary'}
                size="small"
                sx={{ minWidth: 60, padding: '4px 8px', fontSize: '0.7rem' }}
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        );
      },
      sortable: false,
      width: 160,
    }
  ] : []),
];


  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <AppDataGrid
        heading={config.title || 'Manage Records'}
        columns={columns}
        data={data.map((item, index) => ({
          ...item,
          id: config.getId?.(item) || item.id || item._id,
          srNo: page * pageSize + index + 1,
        }))}
        loading={pending}
        rowCount={totalRows}
        paginationModel={{ page, pageSize }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        showHeaderButton={!!config.addButton}
        headerButtonProps={{
          label: config.addButton?.label || 'Add New',
          onClick: () => config.addButton?.onClick(navigate),
        }}
      />
    </div>
  );
};

export default MasterDataGridPage;
