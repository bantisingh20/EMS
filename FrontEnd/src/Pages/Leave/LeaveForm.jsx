import React, { useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { saveLeaveRequest } from '../../api/LeaveApi';
import { handleError, handleSuccess } from '../Common';

const LeaveForm = ({ closeModal }) => {
  const { Formik } = formik;
  const navigate = useNavigate(); // Hook to handle redirection
  const currentDate = new Date().toISOString().split('T')[0];

  const schema = yup.object().shape({
    type: yup.string().required('Type is Required').notOneOf(['', '0'], 'Please select a valid type'),
    typename: yup.string(),
    reason: yup.string().required('Reason is Required').matches(/^(?!\s*$).+/, 'Reason cannot be empty or just spaces'),
    fromdate: yup.date().required('From Date is Required').min(currentDate, "From Date cannot be in the past"),
    todate: yup.date().required('To Date is Required').min(yup.ref('fromdate'), "To Date cannot be before From Date"),
  });

  const FinalLeaveSubmit = async (values) => {
    console.log(values);

    try {
      
      const response = await saveLeaveRequest(values);
      console.log('Leave saved successfully:', response);
      
      handleSuccess('Leave Applied');
      navigate('/dashboard/leave/leavedashboard'); // Redirect to /dashboard after submitting the form

    } catch (error) {
      console.error('Failed to save leave request:', error); 
      handleError(error);
    }
    
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Request Leave</h2>

        <Formik
          validationSchema={schema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={FinalLeaveSubmit}
          initialValues={{
            type: '',
            reason: '',
            fromdate: currentDate,
            todate: currentDate,
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>

              <Row className="mb-4">
                <Form.Label className="block text-gray-700">Leave Type</Form.Label>
                <Form.Control
                  as="select"
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  isValid={touched.type && !errors.type}
                  isInvalid={touched.type && errors.type}
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Privilege Leave">Privilege Leave</option>
                  <option value="Leave Without Pay">Leave Without Pay</option>
                </Form.Control>
                {errors.type && (
                  <Form.Control.Feedback type="invalid" className="text-red-500">
                    {errors.type}
                  </Form.Control.Feedback>
                )}
              </Row>

              <Row className="mb-4">
                <Form.Label className="block text-gray-700">Reason</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  value={values.reason}
                  onChange={handleChange}
                  isValid={touched.reason && !errors.reason}
                />
                {errors.reason && (
                  <Form.Control.Feedback type="invalid" className="text-red-500">
                    {errors.reason}
                  </Form.Control.Feedback>
                )}
              </Row>

              <Row className="mb-4">

                
                <Form.Label className="block text-gray-700">From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fromdate"
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  value={values.fromdate || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.fromdate && !errors.fromdate}
                  isInvalid={touched.fromdate && errors.fromdate}
                  min={currentDate}
                  max={values.todate || undefined} 
                />
                {errors.fromdate && (
                  <Form.Control.Feedback type="invalid" className="text-red-500">
                    {errors.fromdate}
                  </Form.Control.Feedback>
                )}
              </Row>

              <Row className="mb-4">
                <Form.Label className="block text-gray-700">To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="todate"
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  value={values.todate || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.todate && !errors.todate}
                  isInvalid={touched.todate && errors.todate}
                  min={values.fromdate || currentDate} 
                />
                {errors.todate && (
                  <Form.Control.Feedback type="invalid" className="text-red-500">
                    {errors.todate}
                  </Form.Control.Feedback>
                )}
              </Row>

              <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Submit Leave Request
              </button>

            </Form>
          )}
        </Formik>

        <button
          onClick={() => navigate('/dashboard/leave/leavedashboard')} // Close and redirect to dashboard
          type="button"
          className="w-full py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-orange-600"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default LeaveForm;

