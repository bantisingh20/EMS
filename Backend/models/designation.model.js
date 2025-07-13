const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DesignationSchema = new mongoose.Schema({
    // designationid: { type: Number, required: true,default:0 },
    designationname: { type: String, required: true },
    recordstatus: { type: String, required: true, default: 'insert' },
    statusdate: { type: Date, default: Date.now },
    disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
    isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' }
});

// DesignationSchema.plugin(AutoIncrement, { inc_field: 'designationid' });
const DesignationTable = mongoose.model("Designation", DesignationSchema);

const defaultdesignation = [
  { designationname: 'Default Designation' },
   
];

// Function to insert default roles if they don't exist
const initializeDepartment = async () => {
  try {
    const existingRoles = await DesignationTable.find({});
    if (existingRoles.length === 0) {
      await DesignationTable.insertMany(defaultdesignation);
      console.log('Default designation inserted successfully.');
    } else {
      console.log('designation already initialized.');
    }
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
};

//initializeDepartment();
module.exports = {DesignationTable, initializeDepartment};