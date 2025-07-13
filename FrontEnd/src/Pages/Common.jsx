
import React, { useState, useRef, Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import { Field, ErrorMessage } from 'formik';
//import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Input } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { Select, Option } from "@material-tailwind/react";
import DataTable from 'react-data-table-component';
import { CustomLoader } from './loader';
//import { Button, Typography } from '@mui/material'; 

const FormInputField = ({ label, type, id, name, placeholder }) => {
  return (
    <>
      <label className="block text-sm font-semibold mb-1" htmlFor="visitorName">
        {label} <span className="text-red-500">*</span>
      </label>
      <Field type={type} id={id} name={name}
        className="block w-full p-2 border border-gray-300 rounded-md"
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className=" font-bold text-red-500 text-xs mt-1" />
    </>
  );
}

function FormLabels(label) {
  return (
    <Form.Label className={label.className} >{label.label}</Form.Label>
  );
}

function FormControl(formfield) {
  return (
    <Form.Control
      type={formfield.type}
      placeholder={formfield.placeholder}
      className={formfield.className}
      required={formfield.required == 1 ? true : false}
      onChange={formfield.onChange}
      name={formfield.name} />
  );
}


function TextFields({ type, label, name, onChange, className, value, required, placeholder }) {
  return (
    <>
      <Input
        variant="static"
        color="teal"
        label={label}
        placeholder={placeholder}
        // labelProps={{ className: "hidden",}}
        containerProps={{ className: "min-w-[100px]" }}
        type={type}
        onChange={onChange}
        name={name}
        value={value}
      />

    </>
  );
}

function Buttons(Fields) {
  return (
    // <Button type={Fields.type} className={Fields.className}>{Fields.text}</Button>
    <Button
      variant="outline-success"
      type={Fields.type}
      className={Fields.className}
      onClick={Fields.onClick}
    >{Fields.text}</Button>
  );
}

function handleSuccess(message) {
  toast.success(message)
}

function handleError(message) {
  toast.error(message)
}

function handlewarning(message) {
  toast.warning(message)
}

function DashboardCards(fields) {
  return (
    <div className='rounded flex bg-white'>
      <div className={`text-3xl flex justify-center items-center ${fields.color} text-white px-4`}>
        {fields.icons}
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>{fields.text}</p>
        <p className='text-xl  font-semibold'>{fields.number}</p>
      </div>
    </div>
  )
}


const Page500 = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">500</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Internal Server Error.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry something went wrong.</p>
        </div>
      </div>
    </section>
  )
}


const WorkUnderProgress = () => {
  return (
    <div className="bg-white dark:bg-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">Sorry..</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Under Development .</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Explore Other Features.</p>
        </div>
      </div>
    </div>
  )
}


function BasicSelectTag({ label, name, onChange, Data, value }) {
  return (
    <Select variant="static" label={label} name={name} onChange={onChange} value={value}>
      {Data.map(option => (
        <Option key={option.key} value={option.key}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
}

function BasicSearchInput({ onChange }) {

  return (
    <div className="w-full md:w-72">
      <Input label="Search" onChange={onChange}
        icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
    </div>
  );
}

const LazyLoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <CircularProgress size={50} className="text-blue-500" />
          </div>
        }
      >
        <LazyLoadedComponent />
      </Suspense>
    </div>
  );
};

const LazyLoadedComponent = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto flex justify-center items-center">

      <CircularProgress size={50} className="text-blue-500" />

    </div>
  );
};

const lightenColor = (color, amount) => {
  const col = color.startsWith('#') ? color.substring(1) : color;
  const rgb = parseInt(col, 16); // Convert hex to RGB
  const r = (rgb >> 16) + amount;
  const g = ((rgb >> 8) & 0x00FF) + amount;
  const b = (rgb & 0x0000FF) + amount;
  return `#${(1 << 24) | (r << 16) | (g << 8) | b}`.toString(16).slice(1).padStart(6, '0');
};

const darkenColor = (color, amount) => lightenColor(color, -amount);

const AppDataTable = ({ columns, data, progressPending, totalRows, handlePageChange }) => {

  const headerColor = '#00897b'; // Define your header background color

  // Calculate light and dark versions of the header color
  const lighterColor = lightenColor(headerColor, 60);  // Lighter version of the header color
  const darkerColor = darkenColor(headerColor, 50);   // Darker version of the header color

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: headerColor,
        color: 'black', // Optional: set text color
        fontSize: 'small',
      },
    },
    row: {
      style: {
        // Use light/dark color for rows based on a condition (like odd/even rows)
        backgroundColor: (rowIndex) => (rowIndex % 2 === 0 ? 'red' : darkerColor),
        color: (rowIndex) => (rowIndex % 2 === 0 ? 'red' : 'green'),
      },
    },
    cells: {
      style: {
        // Custom cell styles based on row color
        backgroundColor: (rowIndex) => (rowIndex % 2 === 0 ? 'teal-600' : darkerColor),
        color: (rowIndex) => (rowIndex % 2 === 0 ? 'red' : 'green'),
        // Optional: Set text color for contrast
      },
    },
  };

  return (

    // <DataTable 
    //   columns={columns} 
    //   data={data} 
    //   pagination       
    //   progressPending={progressPending} 
    //   progressComponent={<CustomLoader />}
    //   className="mt-6"
    //   customStyles={customStyles}
    // />

    <DataTable
      columns={columns}
      data={data}
      progressPending={progressPending}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={handlePageChange}
      progressComponent={<CustomLoader />}
      className="mt-6"
      customStyles={customStyles}
    />

  );
}
 

// const AppDataGrid = ({ columns, data, heading, showHeaderButton = false, headerButtonProps = {}, }) => {
//   const [columnVisibilityModel, setColumnVisibilityModel] = useState(
//     columns.reduce((acc, col) => {
//       acc[col.field] = true;
//       return acc;
//     }, {})
//   );

//   const adjustedColumns = columns.map((col) => ({
//     ...col,
//     flex: columnVisibilityModel[col.field] ? 1 : 0,
//   }));

//   return (
//     <Box mx={{ height: 'auto', width: '100%' }}>

//       <div
//         className="flex justify-between items-center mb-3"
//         style={{ flexWrap: 'wrap', gap: 10 }}
//       >
//         <Typography
//           variant="subtitle1"
//           sx={{ fontWeight: 'bold', color: '#0f766e', fontSize: '1rem' }}
//         >
//           {heading}
//         </Typography>

//         {showHeaderButton && (
//           <Button
//             variant="contained"
//             color="primary"
//             size="small"
//             sx={{ fontSize: '0.8rem', padding: '5px 12px' }}
//             onClick={headerButtonProps?.onClick}
//           >
//             {headerButtonProps?.label || 'Action'}
//           </Button>

//         )}
//       </div>



//       <DataGrid
//         columns={adjustedColumns}
//         rows={data}
//         rowsPerPageOptions={[5]}
//         checkboxSelection={false}
//         disableSelectionOnClick
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 10,
//             },
//           },
//           ...data.initialState,
//           filter: {
//             filterModel: {
//               items: [],
//             },
//           },
//         }}
//         slots={{ toolbar: GridToolbar }}
//         slotProps={{
//           toolbar: {
//             showQuickFilter: true,
//           },
//         }}
//         pageSizeOptions={[5, 10, 20, 50, 100]}
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
//         sx={{
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#00897b',
//             textAlign: 'center',
//             color: 'black',
//             fontWeight: 'bold',
//           },
//           '& .MuiDataGrid-row': {
//             '&:nth-of-type(even)': {
//               backgroundColor: '#f5f5f5',
//             },
//             '&:nth-of-type(odd)': {
//               backgroundColor: '#e0f7fa',
//             },
//           },
//           '& .MuiDataGrid-cell': {
//             fontSize: '14px',
//             whiteSpace: 'normal',
//             wordWrap: 'break-word',
//           },
//         }}
//       />
//     </Box>
//   );
// };
 
 const AppDataGrid = ({
  columns,
  data,
  heading,
  showHeaderButton = false,
  headerButtonProps = {},
  paginationModel,
  onPageChange,
  onPageSizeChange,
  loading,
  rowCount,
}) => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    columns.reduce((acc, col) => {
      acc[col.field] = true;
      return acc;
    }, {})
  );

  const adjustedColumns = columns.map((col) => ({
    ...col,
    flex: columnVisibilityModel[col.field] ? 1 : 0,
  }));

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <div className="flex justify-between items-center mb-3" style={{ flexWrap: 'wrap', gap: 10 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', color: '#0f766e', fontSize: '1rem' }}
        >
          {heading}
        </Typography>

        {showHeaderButton && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ fontSize: '0.8rem', padding: '5px 12px' }}
            onClick={headerButtonProps?.onClick}
          >
            {headerButtonProps?.label || 'Action'}
          </Button>
        )}
      </div>

      <DataGrid
        columns={adjustedColumns}
        rows={data}
        rowCount={rowCount}
        loading={loading}
        
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          onPageChange?.(model.page);
          onPageSizeChange?.(model.pageSize);
        }}
        checkboxSelection={false}
        disableSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#00897b',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row': {
            '&:nth-of-type(even)': {
              backgroundColor: '#f5f5f5',
            },
            '&:nth-of-type(odd)': {
              backgroundColor: '#e0f7fa',
            },
          },
          '& .MuiDataGrid-cell': {
            fontSize: '14px',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
        }}
      />
    </Box>
  );
};

//module.exports = {}
export { FormInputField, LazyLoadingComponent, AppDataTable, FormLabels, TextFields, BasicSearchInput, FormControl, BasicSelectTag, Buttons, handleSuccess, handleError, DashboardCards, WorkUnderProgress, AppDataGrid }