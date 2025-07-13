const mongoose = require('mongoose');

// Define the RoleWiseRights schema
const RoleWiseRightsSchema = new mongoose.Schema({
  role: { 
    type: String, 
    required: true 
  },
  menuId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Menu', 
    required: true 
  },
  viewRight: { 
    type: Boolean, 
    default: false 
  },
  editRight: { 
    type: Boolean, 
    default: false 
  },
  addRight: { 
    type: Boolean, 
    default: false 
  },
  deleteRight: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true, // Adds createdAt & updatedAt fields
});

// Create the RoleWiseRights model
const RoleWiseRights = mongoose.model('RoleWiseRights', RoleWiseRightsSchema);

module.exports = RoleWiseRights;
