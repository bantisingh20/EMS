import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, Tabs, Tab, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';

const salary = ({ mode = "view" }) => {
  const [employee, setEmployee] = useState('');
  const [salary, setSalary] = useState('');
  const [bonus, setBonus] = useState('');
  const [taxDeduction, setTaxDeduction] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [dearnessAllowance, setDearnessAllowance] = useState('');
  const [houseRentAllowance, setHouseRentAllowance] = useState('');
  const [providentFund, setProvidentFund] = useState('');

  const [employeeList, setEmployeeList] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Brown' },
    { id: 4, name: 'Bob Johnson' },
  ]);

  const [tabIndex, setTabIndex] = useState(0);  // For tabs (Earnings/Deductions)

  useEffect(() => {
    if (salary && bonus && taxDeduction) {
      const calculatedNetSalary = parseFloat(salary) + parseFloat(bonus) - parseFloat(taxDeduction);
      setNetSalary(calculatedNetSalary);
    }
  }, [salary, bonus, taxDeduction]);

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleBonusChange = (event) => {
    setBonus(event.target.value);
  };

  const handleTaxDeductionChange = (event) => {
    setTaxDeduction(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setEmployee(event.target.value);
  };

  const handleSaveSalary = () => {
    if (employee && salary) {
      alert(`Salary for ${employeeList.find(emp => emp.id === employee).name} has been updated to $${salary}`);
    } else {
      alert('Please select an employee and enter a salary.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Calculate Monthly and Yearly CTC
  const calculateCTC = () => {
    const annualSalary = parseFloat(basicSalary) * 12;
    const annualBonus = parseFloat(bonus) * 12;
    const totalCTC = annualSalary + annualBonus;
    return totalCTC;
  };

  return (
    <Box className="bg-white">
      <Box textAlign="center" mb={6}>
        <Typography variant="h4">Salary Master</Typography>
      </Box>

      {mode === "edit" ? (
        <Box display="flex" justifyContent="space-between" px={4}>
          <Box maxWidth="900px" mx="auto" p={4}>
            <Box mb={4}>
              {/* Employee Dropdown */}
              <TextField
                fullWidth
                select
                label="Select Employee"
                value={employee}
                onChange={handleEmployeeChange}
                variant="outlined"
              >
                {employeeList.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box mb={4}>
              {/* Salary Input Field */}
              <TextField
                fullWidth
                label="Enter Salary"
                type="number"
                value={salary}
                onChange={handleSalaryChange}
                variant="outlined"
              />
            </Box>

            {salary && (
              <>
                <Box mb={4}>
                  {/* Bonus Input Field */}
                  <TextField
                    fullWidth
                    label="Enter Bonus"
                    type="number"
                    value={bonus}
                    onChange={handleBonusChange}
                    variant="outlined"
                  />
                </Box>

                <Box mb={4}>
                  {/* Tax Deduction Input Field */}
                  <TextField
                    fullWidth
                    label="Enter Tax Deduction"
                    type="number"
                    value={taxDeduction}
                    onChange={handleTaxDeductionChange}
                    variant="outlined"
                  />
                </Box>
              </>
            )}

            {netSalary !== null && (
              <Box mb={4}>
                {/* Net Salary Display */}
                <Typography variant="h6" align="center">
                  Net Salary: ${netSalary}
                </Typography>
              </Box>
            )}

            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleSaveSalary}>
                Save Salary
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        // View Mode: Display Salary Breakdown in Tabular Form
        <Box p={4}>
          <Typography variant="h5" align="center">
            Employee Salary Breakdown
          </Typography>

          <Box mb={4} mt={2} textAlign="center">
            <Typography variant="h6">
              {employeeList.find(emp => emp.id === employee)?.name}
            </Typography>
            <Typography variant="body1">
              Monthly Salary: ${salary}
            </Typography>
            <Typography variant="body1">
              Yearly CTC: ${calculateCTC()}
            </Typography>
          </Box>

          {/* Tabs for Earnings and Deductions */}
          <Box>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
              <Tab label="Earnings" />
              <Tab label="Deductions" />
            </Tabs>

            <Box p={3}>
              {tabIndex === 0 && (
                // Earnings Tab - Display in Table
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Earnings Type</strong></TableCell>
                        <TableCell><strong>Amount</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Basic Salary</TableCell>
                        <TableCell>${basicSalary}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dearness Allowance (DA)</TableCell>
                        <TableCell>${dearnessAllowance}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>House Rent Allowance (HRA)</TableCell>
                        <TableCell>${houseRentAllowance}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bonus</TableCell>
                        <TableCell>${bonus}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {tabIndex === 1 && (
                // Deductions Tab - Display in Table
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Deductions</strong></TableCell>
                        <TableCell><strong>Amount</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Provident Fund (PF)</TableCell>
                        <TableCell>${providentFund}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tax Deduction</TableCell>
                        <TableCell>${taxDeduction}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default salary;
