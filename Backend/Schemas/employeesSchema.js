const mongoose = require('mongoose');
const multer = require('multer');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt =require('bcrypt');
const {UserTable} = require("../Schemas/user");



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
designation : {type: mongoose.Schema.Types.ObjectId,ref:"Department"},
address :{ type:String},
originalpassword: {type:String},
password:{type:String, required:true },
role:{type:String, required:true },
profileImage:{type:String},
activestatus:{type: String, enum: ['n', 'y'] ,default: 'y'},
recordstatus: { type: String, required: true, default: 'insert' },
statusdate: { type: Date, default: Date.now },
disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
})


// EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employeeid' });
const EmployeeTable = mongoose.model("Employee",EmployeeSchema)



// Function to insert default employees
async function insertDefaultEmployees() {
    const roles = ["admin", "user", "manager", "superadmin"];
    
    for (const role of roles) {
      const employeeCode = `default_${role}`;
      const existingEmployee = await EmployeeTable.findOne({ employeecode: employeeCode });
  
      const password = `${role}123`;
      const haspassword = await bcrypt.hash(password,10);
      if (!existingEmployee) {
        const defaultEmployee = new EmployeeTable({
          employeecode: employeeCode,
          firstname: "Default",
          lastname: role,
          contactno: null,
          emailid: `${role}@gmail.com`,
          dateofbith: null,
          dateofJoining: new Date(),
          gender: "N/A",
          department: null,
          designation: null,
          address: "N/A",
          originalpassword: password,
          password:haspassword,
          role: role,
          profileImage: "N/A",
          activestatus: "y",
          recordstatus: "insert",
          statusdate: new Date(),
          disabled: "n",
          isdeleted: "n",
        });
  
        await defaultEmployee.save();
        console.log(`Inserted default employee for role: ${role}`);
      } else {
       // console.log(`Employee with employeecode ${employeeCode} already exists.`);
      }
    }
  }


const storage = multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null,"public/UploadDocument")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() +path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const SaveEmployee = async(req,res) => {

    try{ 

        const {employeecode,firstname,lastname,contactno,emailid,dateofbith,dateofJoining,
            gender,department,designation,address,password,role
        } = req.body;
        //console.log(req.body);

        const employeExist = await EmployeeTable.findOne( {emailid})
        //console.log(employeExist);
        if(employeExist){
           return res.status(400).json({success:false , message:"Employee Exist" });
        } 
        

        console.log(password);
        const haspassword = await bcrypt.hash(password,10);
        // const newUser = new UserTable({
        //     name : `${firstname} ${lastname}`,
        //     email:emailid,
        //     password:haspassword,
        //     role:role.toLowerCase(),
        //     profileImage:req.file ? req.file.name : "",
        //     disabled:"n"

        // });

       
       // const newSavedUserid = await newUser.save();

        //console.log(newSavedUserid);
        const NewEmployee = EmployeeTable({
            employeecode,
           // Userid:newSavedUserid._id =="" ? 0:newSavedUserid._id,
            employeecode
            ,firstname
            ,lastname
            ,contactno
            ,emailid
            ,dateofbith
            ,dateofJoining
            ,gender
            ,department
            ,designation
            ,address
            ,originalpassword :password
            ,password:haspassword
            ,role:role.toLowerCase()
            ,profileImage:req.file ? req.file.name : ""
            ,role
        });
        await NewEmployee.save();
        res.status(200).json({ success: true, message: "Employee Saved", data: NewEmployee });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success:false , message:"Server Error" , error:error.message});
    }
}


const GetAllEmployees = async(req,res) => {
    try {
         
        const employee = await EmployeeTable.find({isdeleted:"n"}).populate('department');
        
        if(!employee.length){
            return res.status(500).json({success:true, message:"Employee not Exist"})
        }

        res.status(200).json({success:true, message:"Employee retrieving successfully" , data:employee})
        
    } catch (error) {
        console.error('Error retrieving Employee:', error);
        res.status(500).json({ success: false, message: "Error retrieving Employee", error: error.message });
    }
}

const GetEmployeesById = async(req,res) => {
    try { 
        // console.log(e);
        const { id } = req.params;
         console.log(id);
        const Employee = await EmployeeTable.findById(id);

        if(!Employee){
            return res.status(500).json({success:true, message:"Employee not Exist"})
        }
        
        res.status(200).json({ success:true, message:"Employee Found" ,data :Employee  })
    } catch (error) {
        res.status(500).json({ success:false, message:"Error retrieving Employee" , error :error.message })
    }
}

const UpdateEmployee = async (req, res) => {
    try {
 
        const { _id } = req.body; 
        const updatedData = req.body; 
 
        const employee = await EmployeeTable.findById(_id);

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const updatedEmployee = await EmployeeTable.findByIdAndUpdate(
            _id,
            updatedData,
            { new: true }
        );

        res.status(200).json({ success: true, message: "Employee updated successfully",  data: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error updating employee", 
            error: error.message 
        });
    }
};


const DeleteEmployee = async(req,res) => {
    try { 
        const {id} = req.params; 
        //console.log(id);
        const data = await EmployeeTable.findByIdAndUpdate(
            id,
            {isdeleted:'y'},
            { new: true }
        );

        console.log(data);
        res.status(200).json({ success: true, message: "Employee Deleted Successfully", data:data });

    } catch (error) {
        console.error('Error Delete Employee:', error);
        res.status(500).json({ success: false, message: "Error removing Employee", error: error.message });
    }
}


module.exports = {EmployeeTable ,SaveEmployee,upload ,GetAllEmployees ,GetEmployeesById,UpdateEmployee,DeleteEmployee,insertDefaultEmployees}