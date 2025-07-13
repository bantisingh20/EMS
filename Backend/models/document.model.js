// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Assuming you have an Employee model
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Document', documentSchema);
