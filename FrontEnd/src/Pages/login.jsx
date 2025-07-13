import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { TextField, Button, Paper, FormControlLabel, Checkbox, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { sessiondata } from '../Context/Context';
import axiosInstance from '../axiosInstance';
import { handleError, handleSuccess } from './Common';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
});

const LoginPage = () => {
  const { LoginSessionStart } = sessiondata();
  const navigate = useNavigate();

  const getSavedCredentials = () => {
    const saved = JSON.parse(localStorage.getItem('loginCredentials'));
    return saved || { email: '', password: '', remember: false };
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.post('/auth/login', values);
      if (response.success) {
        localStorage.setItem('Token', response.token);
        LoginSessionStart(response.user);
        handleSuccess('Login Successful!');
        if (values.remember) {
          localStorage.setItem('loginCredentials', JSON.stringify(values));
        } else {
          localStorage.removeItem('loginCredentials');
        }
        navigate('/dashboard');
      }
    } catch (err) {
      handleError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = getSavedCredentials();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-gray-100 px-4">
     
      <motion.h1
        className="text-4xl md:text-5xl font-sevillana text-white mb-8"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        Employee Management System
      </motion.h1>

      <Paper elevation={8} className="w-full max-w-md p-8 rounded-lg shadow-md">
        <Typography variant="h5" align="center" gutterBottom className="font-semibold text-gray-800">
          Login to your account
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-5">
              <div>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      variant="outlined"
                      type="email"
                    />
                  )}
                </Field>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      fullWidth
                      variant="outlined"
                      type="password"
                    />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex items-center justify-between">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.remember}
                      onChange={(e) => setFieldValue('remember', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
