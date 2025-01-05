const {UserTable} = require("../Schemas/user");
const bcrypt =require('bcrypt')
const jwt = require("jsonwebtoken");
//const DefaultUser = require("../index");
const { EmployeeTable } = require("../Schemas/employeesSchema");

const verifyuser = async(req,res,next) => {
    try {
       
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
       
        if(!token || token === "null"){
            console.log("token is invalid")
            return res.status(401).json({success:false, message :"Token not provided"});
           
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
 
        if(!decode){
            console.log("token is not valid");
            return res.status(401).json({success:false, message :"Token not valid"});
        }


        if(decode._id == '01'){
            
            const user = {
                _id: '01',
                name:'Admin',
                email:'admin@gmail.com',
                password:'admin123',
                role:'superadmin',
                profileImage:'',
            }

            req.user= user;
            next();
        }
        else{

            //console.log(decode._id);
            const user = await EmployeeTable.findById({_id: decode._id}).select('-password');
            //console.log(user);
            if(!user){
                console.log("user not found");
                return res.status(401).json({success:false, message :"User Not Found"});
            }
            else{
                req.user= user;
                next();
            }
        }
        
    
        //console.log(user)
        
       
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message :"Server Error"});
    }
    
}

module.exports = {
   verifyuser
}