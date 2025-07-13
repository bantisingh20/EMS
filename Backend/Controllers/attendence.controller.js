const { AttendanceTable } = require("../models/attendence.model");
const PunchHistory = require("../models/punchhistory.model");

exports.SaveEmployeePunchIn = async (req, res) => {
  try {
    const { _id } = req.user;
    const { CheckinDate } = req.body;
    const now = new Date(CheckinDate || new Date());

    const today = now.toISOString().split('T')[0];
    const startOfDay = new Date(`${today}T00:00:00.000Z`);
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    // Find today's attendance record
    const attendance = await AttendanceTable.findOne({
      employeeId: _id,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!attendance) {
      // First check-in of the day
      const newAttendance = new AttendanceTable({
        employeeId: _id,
        date: now,
        inTime: now,
        status: "Present",
        outTime: null
      });
      await newAttendance.save();

      const punchLog = new PunchHistory({
        attendanceId: newAttendance._id,
        employeeId: _id,
        punchType: 'in',
        timestamp: now,
        source: 'Web'
      });
      await punchLog.save();

      return res.status(200).json({ success: true, message: 'Checked in', data: newAttendance });

    } else if (attendance.inTime && !attendance.outTime) {
      // Already checked in but not out
      return res.status(400).json({ success: false, message: "You are already checked in and haven't checked out yet." });

    } else if (attendance.inTime && attendance.outTime) {
      // Already checked in and checked out for the day
      return res.status(400).json({ success: false, message: "You have already checked in and out today. No further punches allowed." });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


exports.SaveEmployeePunchOut = async (req, res) => {
  try {
    const { _id } = req.user;
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const startOfDay = new Date(`${today}T00:00:00.000Z`);
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    const attendance = await AttendanceTable.findOne({
      employeeId: _id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ success: false, message: "No check-in found" });
    }

    attendance.outTime = now;
    const totalHrs = (now - attendance.inTime) / (1000 * 60 * 60);
    attendance.totalworkinghrs = parseFloat(totalHrs.toFixed(2));
    attendance.status = "Present";

    await attendance.save();

    const punchLog = new PunchHistory({
      attendanceId: attendance._id,
      employeeId: _id,
      punchType: "out",
      timestamp: now,
      source: "Web",
    });

    await punchLog.save();

    return res
      .status(200)
      .json({ success: true, message: "Checked out", data: attendance });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPunchHistory = async (req, res) => {
  try {
    const { employeeId } = req.query;

    const history = await PunchHistory.find({ employeeId })
      .populate("attendanceId")
      .sort({ timestamp: -1 });

    return res.status(200).json({ success: true, data: history });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const attendanceRecords = await AttendanceTable.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("employeeId");

    return res.status(200).json({ success: true, data: attendanceRecords });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const { _id } = req.user;

    const attendanceRecords = await AttendanceTable.find({ employeeId: _id })
      .populate("employeeId")
      .sort({ date: -1 });

    return res.status(200).json({ success: true, data: attendanceRecords });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
