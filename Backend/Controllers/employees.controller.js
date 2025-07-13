const EmployeeTable = require('../models/employee.model.js').EmployeeTable;
const multer = require('multer'); 

const bcrypt =require('bcrypt');
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
        
        const NewEmployee = EmployeeTable({
            employeecode,
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
         
        const employee = await EmployeeTable.find({isdeleted:"n"}).populate('department','departmentname').populate('designation','designationname').populate('role','rolename')
        .populate('designation','designationname').populate('role','name');
        
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
        const Employee = await EmployeeTable.findById({_id : id});

        console.log(Employee);
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
    const {
      _id,
      employeecode,
      firstname,
      lastname,
      contactno,
      emailid,
      dateofbith,
      dateofJoining,
      gender,
      department,
      designation,
      address,
      originalpassword,
      password,
      role,
    } = req.body;

    const employee = await EmployeeTable.findById(_id);

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // Hash the new password if provided, otherwise use the old one
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : employee.password;

    const updatedFields = {
      employeecode,
      firstname,
      lastname,
      contactno,
      emailid,
      dateofbith,
      dateofJoining,
      gender,
      department,
      designation,
      address,
      originalpassword,
      password: hashedPassword,
      role: role?.toLowerCase() || employee.role,
      profileImage: req.file ? req.file.filename : employee.profileImage,
    };

    const updatedEmployee = await EmployeeTable.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: error.message,
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

module.exports = { SaveEmployee, GetAllEmployees, GetEmployeesById, UpdateEmployee, DeleteEmployee };