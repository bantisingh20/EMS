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

// {
//     $cond: {
//       if: <condition>,       // the condition to evaluate
//       then: <value_if_true>,  // value to return if condition is true
//       else: <value_if_false>  // value to return if condition is false
//     }
// }
  
// async function categorizeEmployees() {
//   const employees = await Employee.aggregate([
//     {
//       $project: {
//         name: 1,
//         salary: 1,
//         category: {
//           $cond: {
//             if: { $gt: ["$salary", 100000] },
//             then: "High",
//             else: {
//               $cond: {
//                 if: { $gte: ["$salary", 50000] },
//                 then: "Medium",
//                 else: "Low"
//               }
//             }
//           }
//         }
//       }
//     }
//   ]);

//   console.log(employees);
// }

// categorizeEmployees();

// async function categorizeByJobTitle() {
//     const employees = await Employee.aggregate([
//       {
//         $project: {
//           name: 1,
//           jobTitle: 1,
//           category: {
//             $switch: {
//               branches: [
//                 { case: { $eq: ["$jobTitle", "Manager"] }, then: "High" },
//                 { case: { $eq: ["$jobTitle", "Developer"] }, then: "Medium" },
//                 { case: { $eq: ["$jobTitle", "Intern"] }, then: "Low" }
//               ],
//               default: "Unknown"
//             }
//           }
//         }
//       }
//     ]);
  
//     console.log(employees);
//   }
   
  

const SavePunchIn_Out = async(req,res) =>{
    try {
        const {inTime} = req.body;
        
        const IsExist = await Attendance.find()
    } catch (error) {
        
    }
}


const GetAttendeceDetails = async(req,res) =>{
    
}
module.exports = Attendance;
