import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { XMarkIcon, KeyIcon } from '@heroicons/react/24/solid';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation Schema using Yup
const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ChangePasswordModal = ({ isOpen = true }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log('Password changed:', data);
    navigate('/dashboard'); // Redirect after submit
  };

  const closeModal = () => {
    navigate('/dashboard'); // Redirect on close
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Change Password</h2>
            <button onClick={closeModal} aria-label="Close modal">
              <XMarkIcon className="w-6 h-6 text-gray-700" />
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
                  startAdornment: <KeyIcon className="w-5 h-5 text-gray-400 mr-2" />,
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
                  startAdornment: <KeyIcon className="w-5 h-5 text-gray-400 mr-2" />,
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
                  startAdornment: <KeyIcon className="w-5 h-5 text-gray-400 mr-2" />,
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
