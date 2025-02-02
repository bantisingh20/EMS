const DatabaseHelper = require('../DatabaseHelper/DatabaseHelper');
const jwt = require("jsonwebtoken");
const dbHelper = new DatabaseHelper();

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
 
            //console.log(decode._id);
            const user = await dbHelper.executeProcedureNew('spGetEmployeeByID',{
                'employeeid': decode._id
            })
            console.log('midle');
            if(!user){
                console.log("user not found");
                return res.status(401).json({success:false, message :"User Not Found"});
            }
            else{ 
                const userResponse = {
                    _id : user[0].employeeid,
                    emailid: user[0].emailid,
                    role: user[0].usergroup,
                    name: user[0].name
                };

                req.user= userResponse;
                next();
            }
         
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message :"Server Error"});
    }
    
}

const verify = async(req,res) =>{
    return res.status(200).json({ success:true, message: 'authenticate successfully' ,user :req.user });
}
module.exports = {
   verifyuser,verify
}