//const { executeProcedure } = require('../config');
const DatabaseHelper = require('../DatabaseHelper/DatabaseHelper');
const jwt = require('jsonwebtoken');
const dbHelper = new DatabaseHelper();
 
const login = async(req, res) => {
 
    const { email, password } = req.body;
    console.log(req.body);
    try {
  
        const result = await dbHelper.executeProcedureNew('SpGetLoginDetails', {
            email: email,
            password: password
          });
        
          console.log(result);
        if (!result || result.length === 0) {
            return res.status(400).json({ success:false, message: 'User credentials are invalid' });
        }
        const user = result;
        
        if (user) {  
            console.log(user[0].employeeid);
            const token = jwt.sign({_id: user[0].employeeid }, process.env.JWT_SECRET,{expiresIn:"1d"})
                  
            return res.status(200).json({ success:true, message: 'Login successful', token, user });
        } else {
             
            return res.status(401).json({success:false,  message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('SQL error:', err);
        return res.status(500).json({ success:false, message: 'Internal server error' });
    }  
};


const verify = async(req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {login};