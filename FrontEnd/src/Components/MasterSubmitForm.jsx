// src/forms/MasterSubmitForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import FormikFormComponent from './FormikFormComponent'; 
import { handleSuccess, handleError } from '../Pages/Common';

const MasterSubmitForm = ({ config }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(config.initialValues || {});

  useEffect(() => {
    console.log("MasterSubmitForm config:", config);
    if (config.mode === 'edit' && id && config.fetchById) {
      config
        .fetchById(id)
        .then((res) => {
          const data = config.mapResponseToValues
            ? config.mapResponseToValues(res)
            : res.data;
          setFormData(data);
        })
        .catch((error) => handleError(error?.message || 'Failed to fetch data'));
    } else {
      setFormData(config.initialValues || {});
    }

    console.log("Form data initialized:", formData);
  }, [config, id]);

  const handleSubmit = async (values) => {
    try {
      const response =
        config.mode === 'edit'
          ? await config.updateFunction({ _id: id, ...values })
          : await config.createFunction(values);

      if (response.success) {
        handleSuccess(response.message || 'Saved successfully');
        navigate(config.redirectPath);
      } else {
        handleError(response?.data?.message || 'Operation failed');
      }
    } catch (error) {
      handleError(error?.response?.data?.message || 'Error saving data');
    }
  };

  const handleCancel = () => {
    navigate(config.redirectPath);
  };

  return (
    <FormikFormComponent
      initialValues={formData}
      fields={config.fields}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default MasterSubmitForm;
