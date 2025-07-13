// import React, { useEffect, useState } from 'react';
// import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { AppDataGrid } from '../Pages/Common';

// const MasterlistPage = ({ config }) => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [pending, setPending] = useState(true);

//   const [page, setPage] = useState(0); // 0-based for MUI
//   const [pageSize, setPageSize] = useState(10);
//   const [totalRows, setTotalRows] = useState(0);

//   const fetchData = async (page = 0, limit = 10) => {
//     setPending(true);
//     try {
//       const res = await config.fetchData({ page: page + 1, limit }); // API expects 1-based
//       console.log('API Response:', res);
//       if (res.success) {
//         console.log('Fetched Data:', res.data);
//         console.log('Pagination:', res.pagination);
//         setData(res.data || []);
//         setTotalRows(res.pagination?.total || 0);
//       } else {
//         setData([]);
//       }
//     } catch (err) {
//       console.error('Fetch Error:', err);
//     }
//     setPending(false);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this entry?')) {
//       try {
//         await config.deleteData(id);
//         fetchData(page, pageSize);
//       } catch (err) {
//         console.error('Delete Error:', err);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData(page, pageSize);
//   }, [page, pageSize]);

// //   const columns = [
// //   ...(config.columns || []),

// //   ...(config.actions ? [
// //     {
// //       field: 'actions',
// //       headerName: 'Action',
// //       renderCell: (params) => {
// //         const row = params.row;
// //         const buttons = config.rowActions?.(row, navigate, handleDelete) || [];
// //         return (
// //           <div style={{ display: 'flex', gap: 8 }}>
// //             {buttons.map((btn, i) => (
// //               <Button
// //                 key={i}
// //                 variant="contained"
// //                 color={btn.color || 'primary'}
// //                 size="small"
// //                 sx={{ minWidth: 60, padding: '4px 8px', fontSize: '0.7rem' }}
// //                 onClick={btn.onClick}
// //               >
// //                 {btn.label}
// //               </Button>
// //             ))}
// //           </div>
// //         );
// //       },
// //       sortable: false,
// //       width: 160,
// //     }
// //   ] : []),
// // ];

// const columns = [
//   ...(config.columns || []),

//   ...(config.actions
//     ? [
//         {
//           field: 'actions',
//           headerName: 'Action',
//           renderCell: (params) => {
//             const row = params.row;
//             const buttons = config.rowActions?.(row, navigate, handleDelete) || [];

//             const getIcon = (type) => {
//               switch (type) {
//                 case 'edit':
//                   return <PencilIcon className="h-4 w-4 mr-1" />;
//                 case 'delete':
//                   return <TrashIcon className="h-4 w-4 mr-1" />;
//                 case 'view':
//                   return <EyeIcon className="h-4 w-4 mr-1" />;
//                 default:
//                   return null;
//               }
//             };

//             return (
//               <div style={{ display: 'flex', gap: 8 }}>
//                 {buttons.map((btn, i) => (
//                   <Button
//                     key={i}
//                     variant="contained"
//                     color={btn.color || 'primary'}
//                     size="small"
//                     sx={{ minWidth: 60, padding: '4px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center' }}
//                     onClick={btn.onClick}
//                   >
//                     {getIcon(btn.type)}
//                     {/* {btn.label} */}
//                   </Button>
//                 ))}
//               </div>
//             );
//           },
//           sortable: false,
//           width: 180,
//         },
//       ]
//     : []),
// ];



//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <AppDataGrid
//         heading={config.title || 'Manage Records'}
//         columns={columns}
//         data={data.map((item, index) => ({
//           ...item,
//           id: config.getId?.(item) || item.id || item._id,
//           srNo: page * pageSize + index + 1,
//         }))}
//         loading={pending}
//         rowCount={totalRows}
//         paginationModel={{ page, pageSize }}
//         onPageChange={setPage}
//         onPageSizeChange={setPageSize}
//         showHeaderButton={!!config.addButton}
//         headerButtonProps={{
//           label: config.addButton?.label || 'Add New',
//           onClick: () => config.addButton?.onClick(navigate),
//         }}
//       />
//     </div>
//   );
// };

// export default MasterlistPage;

import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Button, useMediaQuery, Typography, Card, CardContent, CardActions, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppDataGrid } from '../Pages/Common';

const MasterlistPage = ({ config }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (page = 0, limit = 10) => {
    setPending(true);
    try {
      const res = await config.fetchData({ page: page + 1, limit }); // API expects 1-based
      if (res.success) {
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
    { field: 'srNo', headerName: 'Sr.No', width: 70 },
    ...(config.columns || []),

    ...(config.actions
      ? [{
          field: 'actions',
          headerName: 'Action',
          width: 160,
          sortable: false,
          renderCell: (params) => {
            const row = params.row;
            const buttons = config.rowActions?.(row, navigate, handleDelete) || [];

            const getIcon = (type) => {
              switch (type) {
                case 'edit': return <PencilIcon className="h-4 w-4 mr-1" />;
                case 'delete': return <TrashIcon className="h-4 w-4 mr-1" />;
                case 'view': return <EyeIcon className="h-4 w-4 mr-1" />;
                default: return null;
              }
            };

            return (
              <div style={{ display: 'flex', gap: 6 }}>
                {buttons.map((btn, i) => (
                  <Button
                    key={i}
                    variant="contained"
                    color={btn.color || 'primary'}
                    size="small"
                    sx={{
                      px: 1,
                      minWidth: 'auto',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onClick={btn.onClick}
                  >
                    {getIcon(btn.type)}
                  </Button>
                ))}
              </div>
            );
          }
        }]
      : [])
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ fontWeight: 'bold', color: '#0f766e' }}
        >
          {config.title || 'Manage Records'}
        </Typography>
        {config.addButton && (
          <Button
            variant="contained"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              fontSize: isMobile ? '0.7rem' : '0.875rem',
              px: isMobile ? 1.5 : 2,
              py: isMobile ? 0.5 : 1,
              textTransform: 'none',
            }}
            onClick={() => config.addButton?.onClick(navigate)}
          >
            {config.addButton.label || 'Add New'}
          </Button>
        )}
      </div>

      {/* Mobile Card Layout */}
       {isMobile ? (
  <>
    <Stack spacing={2}>
      {data.map((item, index) => (
        <Card key={index} variant="outlined" sx={{ p: 1 }}>
          <CardContent sx={{ p: 1 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              #{page * pageSize + index + 1}
            </Typography>
            {(config.columns || []).map((col) => (
              <Typography
                key={col.field}
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  mb: 0.5,
                  maxHeight: 40,
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                <strong>{col.headerName}:</strong> {item[col.field]}
              </Typography>
            ))}
          </CardContent>
          {config.actions && (
            <CardActions sx={{ px: 1, pb: 1 }}>
              {(config.rowActions?.(item, navigate, handleDelete) || []).map((btn, i) => (
                <Button
                  key={i}
                  variant="contained"
                  size="small"
                  color={btn.color || 'primary'}
                  onClick={btn.onClick}
                  sx={{
                    fontSize: '0.6rem',
                    minWidth: 'auto',
                    px: 1,
                    py: 0.3,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {btn.type === 'edit' && <PencilIcon className="h-4 w-4" />}
                  {btn.type === 'delete' && <TrashIcon className="h-4 w-4" />}
                  {btn.type === 'view' && <EyeIcon className="h-4 w-4" />}
                </Button>
              ))}
            </CardActions>
          )}
        </Card>
      ))}
    </Stack>

    {/* Pagination Controls for Mobile */}
    <div className="flex justify-between items-center mt-4">
      <Button
        variant="outlined"
        size="small"
        disabled={page === 0}
        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
      >
        Previous
      </Button>
      <Typography variant="body2">
        Page {page + 1} of {Math.ceil(totalRows / pageSize)}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        disabled={(page + 1) * pageSize >= totalRows}
        onClick={() => setPage(prev => prev + 1)}
      >
        Next
      </Button>
    </div>
  </>
) : (
  <AppDataGrid
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
  />
)}

    </div>
  );
};

export default MasterlistPage;
