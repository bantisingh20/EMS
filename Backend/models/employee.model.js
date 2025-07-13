const mongoose = require('mongoose');
const multer = require('multer'); 
const bcrypt =require('bcrypt');
const { DepartmentTable } = require('./department.model');
const { DesignationTable } = require('./designation.model');
const { Role } = require('./role.model');

const EmployeeSchema = new mongoose.Schema({
employeecode : {type:String,required :true, default:'' }, 
//Userid :{type: mongoose.Schema.Types.ObjectId,ref:"User"},
firstname : { type:String , required : true },
lastname : { type : String , required :true},
contactno : {type:Number},
emailid: {type:String, required: true }, 
dateofbith :{type:Date},
dateofJoining : {type:Date,required:true},
gender :{type:String}, 
department : {type: mongoose.Schema.Types.ObjectId,ref:"Department"},
designation : {type: mongoose.Schema.Types.ObjectId, ref:"Designation"},
address :{ type:String},
originalpassword: {type:String},
password:{type:String, required:true },
role: {type: mongoose.Schema.Types.ObjectId,ref:"Role"},
profileImage:{type:String},
activestatus:{type: String, enum: ['n', 'y'] ,default: 'y'},
recordstatus: { type: String, required: true, default: 'insert' },
statusdate: { type: Date, default: Date.now },
disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
});


const EmployeeTable = mongoose.model("Employee",EmployeeSchema);


const insertDefaultEmployees = async () => {
  const roles = await Role.findOne({name:'Superadmin' || 'Admin' || 'Manager' || 'User'});
  const defaultDepartment = await DepartmentTable.findOne({ departmentname: "Default Department" });
  const defaultDesignation = await DesignationTable.findOne({ designationname: "Default Designation" });

 // console.log('Roles:', roles);
  // console.log('Default Department:', defaultDepartment);
  // console.log('Default Designation:', defaultDesignation);
  const defaultDepartmentId = defaultDepartment ? defaultDepartment._id : null;
  const defaultDesignationId = defaultDesignation ? defaultDesignation._id : null;

    //for (const role of roles) {
      const employeeCode = `default_${roles.name.toLowerCase()}`;
      const existingEmployee = await EmployeeTable.findOne({ employeecode: employeeCode });
  
      const password = `${roles.name}123`;
      const haspassword = await bcrypt.hash(password,10);
      if (!existingEmployee) {
        const defaultEmployee = new EmployeeTable({
          employeecode: employeeCode,
          firstname: "Default",
          lastname: roles.name,
          contactno: null,
          emailid: `${roles.name.toLowerCase()}@gmail.com`,
          dateofbith: null,
          dateofJoining: new Date(),
          gender: "N/A",
          department: defaultDepartmentId,
          designation: defaultDesignationId,
          address: "N/A",
          originalpassword: password,
          password:haspassword,
          role: roles._id,
          profileImage: "N/A",
          activestatus: "y",
          recordstatus: "insert",
          statusdate: new Date(),
          disabled: "n",
          isdeleted: "n",
        });
  
        await defaultEmployee.save();
        console.log(`Inserted default employee for role: ${roles.name.toLowerCase()}`);
      } else {
       // console.log(`Employee with employeecode ${employeeCode} already exists.`);
      }
    //}
  }

//insertDefaultEmployees();

const storage = multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null,"public/UploadDocument")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() +path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})




module.exports = {EmployeeTable ,upload,insertDefaultEmployees}