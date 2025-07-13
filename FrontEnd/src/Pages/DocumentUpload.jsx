// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Button,
//   TextField,
//   Input,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import {
//   CloudUpload as CloudUploadIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
// } from '@mui/icons-material';
// import { Formik, Form, useFormikContext } from 'formik';
// import * as Yup from 'yup';

// import {
//   uploadDocument,
//   getDocumentsByEmployee,
//   getDocumentDetails,
//   deleteDocument,
// } from '../api/document.api';
// import { sessiondata } from '../Context/Context';

// const DocumentForm = ({ editingId, file, setFile, onClose, reload }) => {
//   const { getUserInfo } = sessiondata();
//   const { employeeId } = getUserInfo();
//   const formikRef = useRef(null);

//   const validationSchema = Yup.object({
//     documentName: Yup.string().required('Document name is required'),
//   });

//   const handleFileChange = (e, setFieldValue) => {
//     const selected = e.currentTarget.files[0];
//     if (selected) {
//       setFile(selected);
//       setFieldValue('fileName', selected.name);
//     }
//   };

//   const fetchEditData = async (setValues) => {
//     if (editingId) {
//       const doc = await getDocumentDetails(editingId);
//       setValues({
//         documentName: doc.documentName,
//         fileName: doc.fileName || '',
//       });
//     }
//   };

//   useEffect(() => {
//     if (editingId && formikRef.current) {
//       fetchEditData(formikRef.current.setValues);
//     }
//   }, [editingId]);

//   return (
//     <div className="bg-white border rounded p-6">
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h6" className="text-teal-700">
//           {editingId ? 'Edit Document' : 'Upload Document'}
//         </Typography>
//         <Button variant="outlined" onClick={onClose}>
//           Close
//         </Button>
//       </div>

//       <Formik
//         innerRef={formikRef}
//         initialValues={{ documentName: '', fileName: '' }}
//         enableReinitialize
//         validationSchema={validationSchema}
//         onSubmit={async (values, { resetForm }) => {
//           const formData = new FormData();
//           formData.append('documentName', values.documentName);
//           formData.append('employeeId', employeeId);
//           if (editingId) formData.append('documentId', editingId);
//           if (file) formData.append('file', file);

//           await uploadDocument(formData);
//           await reload();
//           resetForm();
//           setFile(null);
//           onClose();
//         }}
//       >
//         {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
//           <Form onSubmit={handleSubmit} className="space-y-5">
//             <TextField
//               label="Document Name"
//               name="documentName"
//               fullWidth
//               size="small"
//               value={values.documentName}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.documentName && Boolean(errors.documentName)}
//               helperText={touched.documentName && errors.documentName}
//             />

//             <Input
//               type="file"
//               fullWidth
//               onChange={(e) => handleFileChange(e, setFieldValue)}
//               inputProps={{ accept: '.pdf,.docx,.txt,.jpg,.png' }}
//             />

//             {values.fileName && (
//               <Typography variant="body2" className="text-teal-700">
//                 Selected File: {values.fileName}
//               </Typography>
//             )}

//             <div className="flex justify-end gap-3">
//               <Button variant="outlined" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 className="bg-teal-600 hover:bg-teal-700"
//                 startIcon={<CloudUploadIcon />}
//                 disabled={!values.documentName || (!file && !editingId)}
//               >
//                 {editingId ? 'Update' : 'Upload'}
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// const DocumentUpload = () => {
//   const [documents, setDocuments] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [file, setFile] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const { getUserInfo } = sessiondata();
//   const { employeeId } = getUserInfo();

//   useEffect(() => {
//     if (employeeId) loadDocuments();
//   }, [employeeId]);

//   const loadDocuments = async () => {
//     const data = await getDocumentsByEmployee(employeeId);
//     setDocuments(data);
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//     setFile(null);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteDocument(id);
//     loadDocuments();
//   };

//   const handleView = (filepath) => {
//     window.open(`http://localhost:3000${filepath}`, '_blank');
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       {!showForm && (
//         <div className="flex justify-between items-center mb-6">
//           <Typography variant="subtitle1" className="text-teal-700 font-semibold">
//             Manage Documents
//           </Typography>
//           <Button
//             variant="contained"
//             className="bg-teal-600 hover:bg-teal-700"
//             size="small"
//             onClick={() => {
//               setEditingId(null);
//               setFile(null);
//               setShowForm(true);
//             }}
//           >
//             Add New Document
//           </Button>
//         </div>
//       )}

//       {showForm ? (
//         <DocumentForm
//           editingId={editingId}
//           file={file}
//           setFile={setFile}
//           onClose={() => {
//             setEditingId(null);
//             setFile(null);
//             setShowForm(false);
//           }}
//           reload={loadDocuments}
//         />
//       ) : (
//         <div className="space-y-4">
//           {documents.length === 0 ? (
//             <Typography variant="body2" className="text-gray-500">
//               No documents uploaded yet.
//             </Typography>
//           ) : (
//             documents.map((doc) => (
//               <Card key={doc._id} className="shadow-sm border rounded">
//                 <CardContent className="flex justify-between items-center p-4">
//                   <div>
//                     <Typography variant="h6" className="text-teal-700">
//                       {doc.documentName}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-600">
//                       Uploaded: {new Date(doc.uploadedAt).toLocaleString()}
//                     </Typography>
//                   </div>
//                   <div className="flex gap-2">
//                     <IconButton onClick={() => handleView(doc.filepath)} color="primary">
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleEdit(doc._id)} color="secondary">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(doc._id)} color="error">
//                       <DeleteIcon />
//                     </IconButton>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentUpload;

import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  TextField,
  Input,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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

  const validationSchema = Yup.object({
    documentName: Yup.string().required('Document name is required'),
  });

  const handleFileChange = (e, setFieldValue) => {
    const selected = e.currentTarget.files[0];
    if (selected) {
      setFile(selected);
      setFieldValue('fileName', selected.name);
    }
  };

  const fetchEditData = async (setValues) => {
    if (editingId) {
      const doc = await getDocumentDetails(editingId);
      setValues({
        documentName: doc.documentName,
        fileName: doc.fileName || '',
      });
    }
  };

  useEffect(() => {
    if (editingId && formikRef.current) {
      fetchEditData(formikRef.current.setValues);
    }
  }, [editingId]);

  return (
    <div className="bg-white border rounded p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-xl text-teal-700 font-semibold">
          {editingId ? 'Edit Document' : 'Upload Document'}
        </h2>
        <Button
          variant="outlined"
          size="small"
          className="text-xs sm:text-sm"
          onClick={onClose}
        >
          Close
        </Button>
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={{ documentName: '', fileName: '' }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          formData.append('documentName', values.documentName);
          formData.append('employeeId', employeeId);
          if (editingId) formData.append('documentId', editingId);
          if (file) formData.append('file', file);

          await uploadDocument(formData);
          await reload();
          resetForm();
          setFile(null);
          onClose();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <TextField
              label="Document Name"
              name="documentName"
              fullWidth
              size="small"
              value={values.documentName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.documentName && Boolean(errors.documentName)}
              helperText={touched.documentName && errors.documentName}
            />

            <Input
              type="file"
              fullWidth
              onChange={(e) => handleFileChange(e, setFieldValue)}
              inputProps={{ accept: '.pdf,.docx,.txt,.jpg,.png' }}
              className="text-sm"
            />

            {values.fileName && (
              <Typography variant="body2" className="text-teal-700 text-sm">
                Selected File: {values.fileName}
              </Typography>
            )}

            <div className="flex justify-end gap-3">
              <Button
                variant="outlined"
                size="small"
                className="text-xs sm:text-sm"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm"
                startIcon={<CloudUploadIcon fontSize="small" />}
                disabled={!values.documentName || (!file && !editingId)}
              >
                {editingId ? 'Update' : 'Upload'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { getUserInfo } = sessiondata();
  const { employeeId } = getUserInfo();

  useEffect(() => {
    if (employeeId) loadDocuments();
  }, [employeeId]);

  const loadDocuments = async () => {
    const data = await getDocumentsByEmployee(employeeId);
    setDocuments(data);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    loadDocuments();
  };

  const handleView = (filepath) => {
    window.open(`http://localhost:3000${filepath}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-3 py-4 sm:px-4 sm:py-6">
      {!showForm && (
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Typography
            variant="subtitle2"
            className="text-teal-700 font-semibold text-sm sm:text-base"
          >
            Manage Documents
          </Typography>
          <Button
            variant="contained"
            size="small"
            className="bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm"
            onClick={() => {
              setEditingId(null);
              setFile(null);
              setShowForm(true);
            }}
          >
            Add Document
          </Button>
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
        <div className="space-y-3 sm:space-y-4">
          {documents.length === 0 ? (
            <Typography variant="body2" className="text-gray-500 text-sm">
              No documents uploaded yet.
            </Typography>
          ) : (
            documents.map((doc) => (
              <Card key={doc._id} className="shadow-sm border rounded text-sm">
                <CardContent className="flex justify-between items-center p-3 sm:p-4">
                  <div>
                    <Typography variant="h6" className="text-teal-700 text-sm sm:text-base">
                      {doc.documentName}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                      Uploaded: {new Date(doc.uploadedAt).toLocaleString()}
                    </Typography>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <IconButton onClick={() => handleView(doc.filepath)} size="small">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(doc._id)} size="small" color="secondary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(doc._id)} size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
