const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DepartmentSchema = new mongoose.Schema({
    // departmentid: { type: Number, required: true,default:0 },
    departmentname: { type: String, required: true },
    recordstatus: { type: String, required: true, default: 'insert' },
    statusdate: { type: Date, default: Date.now },
    disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
    isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' }
});

// DepartmentSchema.plugin(AutoIncrement, { inc_field: 'departmentid' });
const DepartmentTable = mongoose.model("Department", DepartmentSchema);
// Default roles to be added
const defaultdepartmnet = [
  { departmentname: 'Default Department' },
   
];

// Function to insert default roles if they don't exist
const initializeDepartment = async () => {
  try {
    const existingRoles = await DepartmentTable.find({});
    if (existingRoles.length === 0) {
      await DepartmentTable.insertMany(defaultdepartmnet);
      console.log('Default Department inserted successfully.');
    } else {
      console.log('Department already initialized.');
    }
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
};

initializeDepartment();

module.exports = {DepartmentTable, initializeDepartment};
