import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css'; 
import { Select, Option } from "@material-tailwind/react";
import { DepartmentsClass } from '../utilis/department.js';
import { DesignationClass } from '../utilis/designation.js';
  

class CommonClassComponent extends Component {

  departments = new DepartmentsClass();
  designation = new DesignationClass
  constructor(props) {
    super(props);
    this.state = {
      data: [], // State to hold fetched data (either departments or designations)
    };
  }

  componentDidMount() {
    const { type } = this.props; // Get the type from props
    if (type === 'department') {
      this.getAllDepartments(); // Fetch departments if type is department
    } else if (type === 'designation') {
      this.getAllDesignations(); // Fetch designations if type is designation
    }
  }

  
  getAllDepartments = async () => {
    try {
    const response = await this.departments.GetAllDepartmentsNew(); 
    if(response.success){ 
        const data = await response.data
        .filter(dep => dep.disabled == 'n')
        .map((dep) =>({
          id: dep._id,   name: dep.departmentname  ,disabled: dep.disabled
        })) 

        const defaultDepartment = {
            id: '0',  
            name: 'Select a department',  
            disabled: 'n'  
        };
        const updatedData = [defaultDepartment, ...data]; 
        this.setState({ data: updatedData });
             
    }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };


  getAllDesignations = async () => {
    try {
    const response = await this.designation.GetAllDesignations(); 
    if(response.success){ 
        const data = await response.data
        .filter(dep => dep.disabled == 'n')
        .map((dep) =>({
          id: dep._id,   name: dep.designationname  ,disabled: dep.disabled
        })) 

        const defaultDepartment = {
            id: '0',  
            name: 'Select a Designation',  
            disabled: 'n'  
        };
        const updatedData = [defaultDepartment, ...data]; 
        this.setState({ data: updatedData });
             
    }
 
    } catch (error) {
      console.error('Error fetching Designation:', error);
    }
  };

  render() {
    const { data } = this.state;
    const { label, name, onChange ,value} = this.props; // Destructure props

    return (
      <Select variant="static" label={label} name={name} onChange={onChange} value={value}>
        
        {data.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }
}

export default CommonClassComponent;

