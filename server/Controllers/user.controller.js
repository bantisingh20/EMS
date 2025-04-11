const DatabaseHelper = require('../DatabaseHelper/DatabaseHelper');
const jwt = require('jsonwebtoken');
const dbHelper = new DatabaseHelper();

const SaveUser = async(req,res) =>{
    try {
      // console.log(req.user);
      //   console.log(req.body);
      const {employeeid,FirstName, LastName, email, phone, dateofbirth, DateofJoining,department,designation,password } = req.body;
        const result = await dbHelper.executeProcedureNew('spSaveEmployee', {
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
        
          console.log(result.error);
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

module.exports = {SaveUser}