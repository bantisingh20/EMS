const mongoose = require('mongoose');

const punchHistorySchema = new mongoose.Schema({
  attendanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendance', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  punchType: { type: String, enum: ['in', 'out'], required: true },
  timestamp: { type: Date, default: Date.now },
  source: { type: String, default: 'Web' }, // or 'Mobile', 'Device'
  note: { type: String }
}, { timestamps: true });

const PunchHistory = mongoose.model('PunchHistory', punchHistorySchema);
module.exports = PunchHistory;
