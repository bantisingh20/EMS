const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    employeeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',  
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Sick Leave', 'Privilege Leave', 'Leave Without Pay'],  
    },
    reason: {
      type: String,
      required: true,
      trim: true, 
    },
    fromdate: {
      type: Date,
      required: true,
    },
    todate: {
      type: Date,
      required: true,
    },
   
    approval_date: {
      type: Date,  
    },
    approval_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',  
    },
    approval_remark: {
      type: String, 
    },
    is_delete: {
      type: Boolean,
      default: false, // Soft delete flag
    },
    is_active: {
      type: Boolean,
      default: true, // Active flag to indicate if the leave request is still active
    },
    statusid: {
        type: String,
        enum: ['1', '2', '3', '4'],
        default: '1', 
    },
    leave_status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
      default: 'Pending', 
    },
    pass: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,  
  }
);


const Leave = mongoose.model('Leave', leaveSchema);


const SaveLeave = async (req,res) => {
    try{

      //console.log(req);

      const {type ,reason ,fromdate,todate} = req.body;
      console.log(req.user._id);

      const {_id} = req.user;

      console.log(_id);
        const isExist = await Leave.find({
            is_active: true,
            employeeid: _id,  
            fromdate: fromdate,  
            todate: todate,  
        });

        console.log(isExist);
        if (isExist.length > 0) {
            return res.status(400).json({ success:false,
              message: 'Leave already exists for the given date range.',
            });
        }
         const newLeave = new Leave({
            employeeid: _id,
            type: type,
            reason: reason,
            fromdate: fromdate,
            todate: todate,            
            pass: false
        })

        await newLeave.save();
        res.status(200).json({ success:true, message: 'Leave applied successfully!', newLeave });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ success:false, message : 'Error While applying for leave'});
    }
}


const GetLeaveDetails = async (req,res) =>{
  try {
    const {_id} =  req.user;
 
    const leavedetails = await Leave.find({ is_active: true, employeeid: _id })
    .populate('employeeid','employeecode firstname lastname emailid');

    //console.log(leavedetails);
    if(leavedetails.length == 0){
      res.status(200).json({ success:true, message : 'Not Found any leave record'})
      return;
    }

    const result = leavedetails.map((leave,index) => {
    const employee = leave.employeeid;
    
      return {
        id :index+1,
        leaveid:leave._id,
        leaveType: leave.type,
        employeeName: `${employee.firstname} ${employee.lastname}`,  // Concatenate firstname and lastname
        fromDate :leave.fromdate.toISOString().split('T')[0],
        toDate: leave.todate.toISOString().split('T')[0],
        reason: leave.reason,
        status: leave.leave_status,
        statusid:leave.statusid,
      };
    });

    res.status(200).json({ success:true, message : 'View your leaves',data :result});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success:false, message : 'Error retrieving leaves'});
  }
}
module.exports = {Leave ,SaveLeave,GetLeaveDetails};
