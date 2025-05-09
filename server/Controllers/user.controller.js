const DatabaseHelper = require('../DatabaseHelper/DatabaseHelper');
const jwt = require('jsonwebtoken');
const dbHelper = new DatabaseHelper();

const SaveUser = async(req,res) =>{
    try {
      // console.log(req.user);
      //   console.log(req.body);
      const {employeeid,FirstName, LastName, email, phone, dateofbirth, DateofJoining,department,designation,password,Employeecode } = req.body;
        const result = await dbHelper.executeProcedureNew('spSaveEmployee', {
          Employeecode,
          employeeid,
          FirstName,
          LastName,
          email,
          phone,
          dateofbirth,
          DateofJoining,
          department,
          designation,
          password,
          });

          if (result && result.length > 0) {
            debugger;
            const { code, message } = result[0];
            
            // If code is 0, it's success; otherwise, return the message
            if (code === 0) {
              return res.status(200).json({ success: true, message });
            } else {
              return res.status(400).json({ success: false, message });
            }
          }
          
          // Fallback for unexpected cases
          return res.status(500).json({ success: false, message: "Unexpected error occurred." });
 
    } catch (error) {
      console.log(error);
        return res.status(500).json({ success:false, message: error.message });
    }
}

const GetAllEmployee = async(req,res) => {
  try { 
      const data = await dbHelper.executeProcedureNew('SpGetAllEmployees');
       

      return res.status(200).json({ success:true, message: ' View All Designation', data: data});
  } catch (error) {
      return res.status(500).json({ success:false, message: error.message });
  }
}


const GetAllEmployeeById = async(req,res) => {
  try { 

    console.log(req);
      const data = await dbHelper.executeProcedureNew('SpGetAllEmployees',{
        id
      });
       

      return res.status(200).json({ success:true, message: ' View All Designation', data: data});
  } catch (error) {
      return res.status(500).json({ success:false, message: error.message });
  }
}

const DeleteEmployeeById = async(req,res) => {
  try { 
    const data = await dbhelper.executeScalar(' update employees set isActive='+"'n'"+',isDelete='+"'y'"+' where employeeid = '+req.params.id);
        
      return res.status(200).json({ success:true, message: 'Employee Delete Successfully', data: data});
  } catch (error) {
      return res.status(500).json({ success:false, message: error.message });
  }
}

module.exports = {SaveUser,GetAllEmployee}