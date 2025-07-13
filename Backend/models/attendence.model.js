const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee',  required: true },
  date: { type: Date, required: true, default: Date.now },
  inTime: { type: Date, required: true, },
  outTime: { type: Date,  required: false, },
  totalworkinghrs :{type :Number,required:false,},
  status: { type: String,  enum: ['Present', 'Absent', 'Leave'], default: 'Present', },
  createdAt: { type: Date,  default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

attendanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
  

const SaveEmployeePunchIn = async(req,res) =>{
    try {

        const {_id} = req.user; 
        const { CheckinDate } = req.body;
        console.log(req.body);
        const now = new Date();

        console.log(now);
        // Format the time to hh:mm:ss
        // const hours = String(CheckinDate.getHours()).padStart(2, '0');
        // const minutes = String(CheckinDate.getMinutes()).padStart(2, '0');
        // const seconds = String(CheckinDate.getSeconds()).padStart(2, '0');
        // const timeString = `${hours}:${minutes}:${seconds}`;

        const PunchIn = new Attendance({
            employeeId : _id,
            inTime : CheckinDate,
        });

        await PunchIn.save();

        return res.status(200).json({success:true , message :'Employee has successfully check in'});
        

       
    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false , message :error.message});
        
    }
} 

const GetAttendeceDetails = async(req,res) =>{
    try {
      
      const {userid} = req.headers;
      console.log(userid)
      const now = new Date();
       
      const todayDate = now.toISOString().split('T')[0];  

      const startOfDay = new Date(todayDate + "T00:00:00.000Z");
      const endOfDay = new Date(todayDate + "T23:59:59.999Z");
      
      const IsPunchIn = await Attendance.find({
        date: {
          $gte: startOfDay, //Greaer than and equal to start date or syntax for that
          $lt: endOfDay // less than and equal to syntax
        },
         employeeId :userid
      });
 
      if(IsPunchIn.length > 0){
         
        return res.status(200).json({success: true ,message:'You have already checkin' , data: IsPunchIn})
      }

      return res.status(200).json({success: true ,message:'your check-In is yet pending'});
      // const IsPunchIn = await Attendance.aggregate([
      //   {
      //     $project: {
      //       dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
      //       originalData: "$$ROOT" // Keep all the original document fields
      //     }
      //   },
      //   {
      //     $match: {
      //       dateOnly: todayDate
      //         }
      //       },
      //     {
      //       $replaceRoot: { newRoot: "$originalData" } // Replace the root with the original document
      //     }
      //   ]);
 
  
    } catch (error) {
      console.log(error.message);
    }
}

const SaveEmployeePunchOut = async(req,res) =>{
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {Attendance ,SaveEmployeePunchIn,SaveEmployeePunchOut,GetAttendeceDetails};
