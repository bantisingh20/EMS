import axiosInstance from '../axiosInstance'; 
 
export const uploadDocument = async (formData) => {
  try {
    const response = await axiosInstance.post(`/document/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};


export const getDocumentsByEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/document/list/${employeeId}`);
    console.log('Documents fetched:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching document list:', error);
    throw error;
  }
};

export const getDocumentDetails = async (documentId) => {
  try {
    const response = await axiosInstance.get(`/document/details/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document details:', error);
    throw error;
  }
};


export const deleteDocument = async (documentId) => {
  try {
    const response = await axiosInstance.delete(`/document/delete/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
