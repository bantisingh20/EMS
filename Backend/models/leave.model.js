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


const LeaveTable = mongoose.model('Leave', leaveSchema);

module.exports = {LeaveTable};
