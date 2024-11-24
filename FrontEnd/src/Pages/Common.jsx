import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Input } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline';
 
import 'react-toastify/dist/ReactToastify.css'; 
import { Select, Option } from "@material-tailwind/react";
import DataTable from 'react-data-table-component';
import { CustomLoader } from './loader';
 

function FormLabels(label){
    return(
        <Form.Label className={label.className} >{label.label}</Form.Label>
    );
}

function FormControl(formfield){
    return(
        <Form.Control
         type={formfield.type} 
         placeholder={formfield.placeholder} 
         className={formfield.className}
         required={formfield.required == 1 ? true : false} 
         onChange={formfield.onChange}
         name={formfield.name} />
    );
}


function TextFields({type,label, name, onChange,className, value,required,placeholder }) {
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

  function Buttons(Fields){
    return(
      // <Button type={Fields.type} className={Fields.className}>{Fields.text}</Button>
      <Button 
        variant="outline-success"
        type={Fields.type} 
        className={Fields.className}
        onClick={Fields.onClick}
        >{Fields.text}</Button> 
    );
  }

function handleSuccess(message){
  toast.success(message)
}

function handleError(message){
  toast.error(message)
}

function handlewarning(message){
  toast.warning(message)
}

function DashboardCards(fields){
  return(
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


const Page500 = () =>{
  return(
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


const WorkUnderProgress = () =>{
  return(
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


function BasicSelectTag({ label, name, onChange, Data ,value}) {
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

function BasicSearchInput({onChange}){
   
  return (
    <div className="w-full md:w-72">
      <Input label="Search" onChange={onChange}
      icon={<MagnifyingGlassIcon className="h-5 w-5" />}  />
    </div>
  );
}

const AppDataTable = ({columns,data}) =>{
 
  return(

    <DataTable 
      columns={columns} 
      data={data} 
      pagination 
      
      progressPending={false} 
      progressComponent={<CustomLoader />}
      className="mt-6"
      customStyles={{
        headCells: {
        style: {
          backgroundColor: '#00897b',
          color: 'black', // Optional: set text color
          fontSize:'small',      
        },
      },
      }}
    />
          

  );
}
//module.exports = {}
export {AppDataTable,FormLabels,TextFields ,BasicSearchInput ,FormControl ,BasicSelectTag, Buttons ,handleSuccess , handleError,DashboardCards,WorkUnderProgress}