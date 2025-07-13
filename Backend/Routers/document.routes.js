// routes/documents.js

const express = require('express');
const multer = require('multer');
const Document = require('../models/document.model');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/EmployeeDocuments');

    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

 
const upload = multer({ storage });


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    console.log('Request user:', req.user);

    const { documentId, documentName,employeeId } = req.body;
//    const employeeId = req.user._id; // From token middleware
    const fileName = req.file ? req.file.filename : null;
    const filepath = req.file ? `/uploads/EmployeeDocuments/${fileName}` : null;
console.log('File path:', filepath);

    let document;

    if (documentId) {
      // Update existing
      document = await Document.findByIdAndUpdate(
        documentId,
        {
          ...(documentName && { documentName }),
          ...(fileName && { fileName }),
          ...(filepath && { filepath }),
          uploadedAt: new Date(),
        },
        { new: true }
      );
    } else {
      // Create new
      document = new Document({
        documentName,
        fileName,
        filepath,
        uploadedAt: new Date(),
        employeeId,
        isActive: true,
        isDeleted: false,
      });
      await document.save();
    }

    res.status(200).json(document);
  } catch (err) {
    console.error('Error uploading/updating document:', err);
    res.status(500).json({ message: 'Failed to save document.' });
  }
});


router.get('/list/:employeeId', async (req, res) => {
  try {
    //    const employeeId = req.user._id; // Assuming user ID is stored in req.user

    const documents = await Document.find({
     // employeeId: req.params.employeeId,
      isDeleted: false,
    }).sort({ uploadedAt: -1 });

    res.status(200).json({success: true, message:'list of doc' ,data:documents });
  } catch (err) {
    console.error('Error getting document list:', err);
    res.status(500).json({ message: 'Failed to fetch documents.' });
  }
});


 router.get('/details/:id', async (req, res) => {
  try {
    console.log('Fetching document details for ID:', req.params.id);
    const document = await Document.findById(req.params.id);
    console.log('Document found:', document);
    if (!document || document.isDeleted) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    res.status(200).json({success:true , message:'Edit Doc', data:document});
  } catch (err) {
    console.error('Error fetching document details:', err);
    res.status(500).json({ message: 'Failed to fetch document.' });
  }
});


 router.delete('/delete/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    res.status(200).json({ message: 'Document deleted successfully.' });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ message: 'Failed to delete document.' });
  }
});

module.exports = router;
