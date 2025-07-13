const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true, default: Date.now },
  inTime: { type: Date, required: true },
  outTime: { type: Date },
  totalworkinghrs: { type: Number }, // e.g. 7.5 (in hours)
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

attendanceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const AttendanceTable = mongoose.model('Attendance', attendanceSchema);

const workingHourPolicySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  expectedHoursPerDay: { type: Number, default: 8 }, // standard working hrs/day
  createdAt: { type: Date, default: Date.now },
});

const WorkingHourPolicy = mongoose.model('WorkingHourPolicy', workingHourPolicySchema);


module.exports = {AttendanceTable, WorkingHourPolicy};