import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikFormComponent = ({ initialValues, fields, onSubmit }) => {
  console.log(fields); 
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 
  const buildValidationSchema = (fields) => {
    const shape = {};
  
    fields.forEach(field => {
      const isRequired = field.validation?.required;
  
      if (isRequired) {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'tel':
            shape[field.name] = Yup.string()
              .trim()
              .required(`${field.label} is required`);
  
            if (field.type === 'email') {
              shape[field.name] = shape[field.name].email('Invalid email format');
            }
  
            if (field.name === 'phone') {
              shape[field.name] = shape[field.name].matches(phoneRegExp, 'Phone number is not valid');
            }
            break;
  
          case 'date':
            shape[field.name] = Yup.date().required(`${field.label} is required`);
            break;
  
          case 'select':
            shape[field.name] = Yup.string()
              .required(`${field.label} is required`)
              .notOneOf(['0', '', null], `Please select a valid ${field.label.toLowerCase()}`);
            break;
  
          case 'checkbox':
            shape[field.name] = Yup.boolean()
              .oneOf([true], `${field.label} must be accepted`);
            break;
  
          case 'radio':
            shape[field.name] = Yup.string()
              .required(`Please select a ${field.label.toLowerCase()}`);
            break;
  
          case 'checkboxGroup':
            shape[field.name] = Yup.array()
              .min(1, `Select at least one ${field.label.toLowerCase()}`);
            break;
  
          default:
            shape[field.name] = Yup.string().trim().required(`${field.label} is required`);
        }
      }
    });
  
    return Yup.object().shape(shape);
  };
  
 const validationSchema = buildValidationSchema(fields);

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
                      autocomplete="new-password"
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