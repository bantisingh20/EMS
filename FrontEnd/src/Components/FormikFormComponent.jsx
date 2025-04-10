import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikFormComponent = ({ initialValues, validationSchema, fields, onSubmit }) => {
  console.log(fields); 
  return (
   <>
   
   <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-auto mx-auto p-6 bg-white rounded-md shadow-lg">
          {/* Grid system for responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field, index) => {
              // Check if the field is required for conditional visibility
              const isRequired = field.validation && field.validation.required;
              const shouldShowField = isRequired || initialValues[field.name] !== '';

              return (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-left text-gray-700 text-sm font-semibold mb-2"
                  >
                    {field.label} {isRequired && <span className="text-red-500">*</span>}
                  </label>
                  {/* Handle different input types */}
                  {field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'tel' || field.type === 'password' ? (
                    <Field
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder || ''}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === 'textarea' ? (
                    <Field
                      as="textarea"
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder || ''}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === 'select' ? (
                    <Field
                      as="select"
                      name={field.name}
                      id={field.name}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {field.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : field.type === 'checkbox' ? (
                    field.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <Field
                          type="checkbox"
                          name={field.name}
                          value={option.value}
                          id={`${field.name}-${option.value}`}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`${field.name}-${option.value}`}
                          className="text-sm text-gray-700"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))
                  ) : field.type === 'radio' ? (
                    field.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <Field
                          type="radio"
                          name={field.name}
                          value={option.value}
                          id={`${field.name}-${option.value}`}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`${field.name}-${option.value}`}
                          className="text-sm text-gray-700"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))
                  ) : field.type === 'file' ? (
                    <Field
                      type="file"
                      name={field.name}
                      id={field.name}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === 'date' ? (
                    <Field
                      type="date"
                      name={field.name}
                      id={field.name}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === 'time' ? (
                    <Field
                      type="time"
                      name={field.name}
                      id={field.name}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === 'color' ? (
                    <Field
                      type="color"
                      name={field.name}
                      id={field.name}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === 'range' ? (
                    <Field
                      type="range"
                      name={field.name}
                      id={field.name}
                      className="w-full"
                    />
                  ) : null}

                  <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
                  {/* Show document section or help text based on field type */}
                  {field.document && <div className="text-sm text-gray-500 mt-2">{field.document}</div>}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
   

   </>
  );
};

export default FormikFormComponent;