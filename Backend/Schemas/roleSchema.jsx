const mongoose = require('mongoose');

// Define the Role Schema
const roleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    default: "" 
  },
});

// Create the Role Model
const Role = mongoose.model('Role', roleSchema);

// Default roles to be added
const defaultRoles = [
  { name: 'Superadmin', description: 'Full access to all resources and settings.' },
  { name: 'Admin', description: 'Add,Update, Delete ' },
  { name: 'Manager', description: 'approve leaves and view team performance.' },
  { name: 'User', description: 'view their profiles and apply for leaves.' },
];

// Function to insert default roles if they don't exist
const initializeRoles = async () => {
  try {
    const existingRoles = await Role.find({});
    if (existingRoles.length === 0) {
      await Role.insertMany(defaultRoles);
      console.log('Default roles inserted successfully.');
    } else {
      console.log('Roles already initialized.');
    }
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
};

module.exports = { Role, initializeRoles };
