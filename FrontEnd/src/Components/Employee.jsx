import React, { Component } from 'react';
import { Select, MenuItem } from '@mui/material';

class EmployeeDropdown extends Component {
  render() {
    const { field, errors, obj,label, data } = this.props;
    
    return (
      <Select
        {...field}   
        fullWidth    
        displayEmpty   
        error={!!errors.gender}   
        defaultValue=""   
      >
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        {data && data.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

export default EmployeeDropdown;
