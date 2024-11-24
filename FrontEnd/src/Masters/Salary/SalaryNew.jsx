import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import axiosInstance from '../../axiosInstance';

const SalaryMasterPage = () => {
    // List of employees (could be fetched dynamically from an API)
    const employees = ['098756757575797090', 'Jane Smith', 'Alice Johnson', 'Bob Lee'];

    // Yup validation schema
    const validationSchema = Yup.object({
        employeeId: Yup.string().required('Employee is required'),
        basicSalary: Yup.number().required('Basic Salary is required').positive('Must be positive'),
        houseRentAllowance: Yup.number().optional().positive('Must be positive'),
        transportAllowance: Yup.number().optional().positive('Must be positive'),
        medicalAllowance: Yup.number().optional().positive('Must be positive'),
        otherDeductions: Yup.number().optional().positive('Must be positive'),
        payDate: Yup.date().required('Pay Date is required').nullable(),
    });

    // React Hook Form setup with Yup validation
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

 

    // Submit handler
    const onSubmit =async (data) => { 
        const response = await axiosInstance.post('/api/salary/save-salary',data);

        console.log(response);
        console.log(data);
    };

    return (
        <Box className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <h2 className="text-2xl font-bold text-center mb-6">Employee Salary Management</h2>

            {/* Employee Searchable Dropdown (Autocomplete) */}
            <Autocomplete
                options={employees}
                onChange={(event, newValue) => setValue('employeeId', newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Employee"
                        error={Boolean(errors.employeeId)}
                        helperText={errors.employeeId ? errors.employeeId.message : ""}
                        fullWidth
                        className="mb-6" // Tailwind margin-bottom class for spacing
                    />
                )}
            />

            {/* Salary Fields */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Basic Salary"
                    type="number"
                    {...register("basicSalary")}
                    fullWidth
                    className="mb-6"
                    required
                    error={Boolean(errors.basicSalary)}
                    helperText={errors.basicSalary ? errors.basicSalary.message : ""}
                />
                <TextField
                    label="House Rent Allowance"
                    type="number"
                    {...register("houseRentAllowance")}
                    fullWidth
                    className="mb-6"
                    error={Boolean(errors.houseRentAllowance)}
                    helperText={errors.houseRentAllowance ? errors.houseRentAllowance.message : ""}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Transport Allowance"
                    type="number"
                    {...register("transportAllowance")}
                    fullWidth
                    className="mb-6"
                    error={Boolean(errors.transportAllowance)}
                    helperText={errors.transportAllowance ? errors.transportAllowance.message : ""}
                />
                <TextField
                    label="Medical Allowance"
                    type="number"
                    {...register("medicalAllowance")}
                    fullWidth
                    className="mb-6"
                    error={Boolean(errors.medicalAllowance)}
                    helperText={errors.medicalAllowance ? errors.medicalAllowance.message : ""}
                />
            </Box>

            <TextField
                label="Other Deductions"
                type="number"
                {...register("otherDeductions")}
                fullWidth
                className="mb-6"
                error={Boolean(errors.otherDeductions)}
                helperText={errors.otherDeductions ? errors.otherDeductions.message : ""}
            />

            {/* Pay Date Field */}
            <TextField
                label="Pay Date"
                type="date"
                {...register("payDate")}
                fullWidth
                className="mb-6"
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.payDate)}
                helperText={errors.payDate ? errors.payDate.message : ""}
            />

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                fullWidth
                className="mb-4"
            >
                Save Salary
            </Button>
        </Box>
    );
};

export default SalaryMasterPage;
