 

import React, { useEffect, useState, useRef } from 'react';
import {
  CloudUpload,
  Edit,
  Delete,
  Visibility,
  Close,
  Add,
  Description,
  CalendarToday,
  Person
} from '@mui/icons-material';
import {
  uploadDocument,
  getDocumentsByEmployee,
  getDocumentDetails,
  deleteDocument,
} from '../api/document.api';
import { sessiondata } from '../Context/Context';
  

const DocumentForm = ({ editingId, file, setFile, onClose, reload }) => {
  const { getUserInfo } = sessiondata();
  const { employeeId } = getUserInfo();
  const formikRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    documentName: '',
    fileName: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.documentName.trim()) {
      newErrors.documentName = 'Document name is required';
    }
    if (!editingId && !file) {
      newErrors.file = 'Please select a file';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFormData(prev => ({ ...prev, fileName: selected.name }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const fetchEditData = async () => {
    if (editingId) {
      const doc = await getDocumentDetails(editingId);
      setFormData({
        documentName: doc.documentName,
        fileName: doc.fileName || '',
      });
    }
  };

  useEffect(() => {
    if (editingId) {
      fetchEditData();
    }
  }, [editingId]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('documentName', formData.documentName);
      submitData.append('employeeId', employeeId);
      if (editingId) submitData.append('documentId', editingId);
      if (file) submitData.append('file', file);

      await uploadDocument(submitData);
      await reload();
      setFormData({ documentName: '', fileName: '' });
      setFile(null);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
          {editingId ? 'Edit Document' : 'Upload Document'}
        </h2>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors self-start sm:self-auto"
        >
          <Close sx={{ fontSize: 18 }} />
          <span className="text-sm">Close</span>
        </button>
      </div>

      <div onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Name *
          </label>
          <input
            type="text"
            value={formData.documentName}
            onChange={(e) => setFormData(prev => ({ ...prev, documentName: e.target.value }))}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
              errors.documentName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter document name"
          />
          {errors.documentName && (
            <p className="mt-1 text-sm text-red-600">{errors.documentName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File {!editingId && '*'}
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.jpg,.png"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <CloudUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOCX, TXT, JPG, PNG (Max 10MB)
                </p>
              </div>
            </label>
          </div>
          {errors.file && (
            <p className="mt-1 text-sm text-red-600">{errors.file}</p>
          )}
        </div>

        {formData.fileName && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Description className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800">
              Selected: {formData.fileName}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CloudUpload sx={{ fontSize: 18 }} />
                <span>{editingId ? 'Update' : 'Upload'}</span>
              </>
            )}
          </button>
        </div>
              </div>
    </div>
  );
};

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserInfo } = sessiondata();
  const { employeeId } = getUserInfo();

  useEffect(() => {
    if (employeeId) loadDocuments();
  }, [employeeId]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const data = await getDocumentsByEmployee(employeeId);
      setDocuments(data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
        loadDocuments();
      } catch (error) {
        console.error('Failed to delete document:', error);
      }
    }
  };

  const handleView = (filepath) => {
    window.open(`http://localhost:3000${filepath}`, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8">
      {!showForm && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Document Management
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Upload, edit, and manage your documents
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFile(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg mt-4 sm:mt-0"
          >
            <Add sx={{ fontSize: 20 }} />
            <span>Add Document</span>
          </button>
        </div>
      )}

      {showForm ? (
        <DocumentForm
          editingId={editingId}
          file={file}
          setFile={setFile}
          onClose={() => {
            setEditingId(null);
            setFile(null);
            setShowForm(false);
          }}
          reload={loadDocuments}
        />
      ) : (
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
              <span className="ml-2 text-gray-600">Loading documents...</span>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <Description className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg mb-2">No documents uploaded yet</p>
              <p className="text-gray-400 text-sm">
                Get started by uploading your first document
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Description className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg mb-1">
                              {doc.documentName}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <CalendarToday sx={{ fontSize: 14 }} />
                                <span>Uploaded: {formatDate(doc.uploadedAt)}</span>
                              </div>
                              {doc.fileName && (
                                <div className="flex items-center gap-1">
                                  <Description sx={{ fontSize: 14 }} />
                                  <span>File: {doc.fileName}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(doc.filepath)}
                          className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Document"
                        >
                          <Visibility sx={{ fontSize: 16 }} />
                          <span className="text-sm">View</span>
                        </button>
                        <button
                          onClick={() => handleEdit(doc._id)}
                          className="flex items-center gap-1 px-3 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Document"
                        >
                          <Edit sx={{ fontSize: 16 }} />
                          <span className="text-sm">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Document"
                        >
                          <Delete sx={{ fontSize: 16 }} />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;