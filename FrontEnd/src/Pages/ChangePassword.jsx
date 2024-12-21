import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdClose } from 'react-icons/md';  // Close icon for modal
import { FaKey } from 'react-icons/fa';   // Key icon for password field
import { Button, TextField, Box } from '@mui/material';

// Validation Schema using Yup
const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ChangePasswordModal = ({ isOpen=true }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        // Simulate a password change
        console.log('Password changed:', data);
        // Close modal after successful submission
        closeModal();
    };

    const closeModal = () => {
        isOpen=false;
    }
    return (
        // Modal background, appears only when isOpen is true
        isOpen ? (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Change Password</h2>
                        <button onClick={closeModal}>
                            <MdClose size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="space-y-4">
                            {/* Current Password Input */}
                            <TextField
                                label="Current Password"
                                type="password"
                                {...register('currentPassword')}
                                fullWidth
                                error={Boolean(errors.currentPassword)}
                                helperText={errors.currentPassword?.message}
                                InputProps={{
                                    startAdornment: (
                                        <FaKey className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />

                            {/* New Password Input */}
                            <TextField
                                label="New Password"
                                type="password"
                                {...register('newPassword')}
                                fullWidth
                                error={Boolean(errors.newPassword)}
                                helperText={errors.newPassword?.message}
                                InputProps={{
                                    startAdornment: (
                                        <FaKey className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />

                            {/* Confirm Password Input */}
                            <TextField
                                label="Confirm Password"
                                type="password"
                                {...register('confirmPassword')}
                                fullWidth
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    startAdornment: (
                                        <FaKey className="text-gray-400 mr-2" />
                                    ),
                                }}
                            />

                            {/* Submit Button */}
                            <div className="flex justify-center mt-4">
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Change Password
                                </Button>
                            </div>
                        </Box>
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default ChangePasswordModal;
