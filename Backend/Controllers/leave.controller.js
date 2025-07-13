const LeaveTable = require("../models/leave.model").LeaveTable;
const mongoose = require("mongoose");

exports.SaveLeave = async (req, res) => {
  try {
    //console.log(req);

    const { type, reason, fromdate, todate } = req.body;
    console.log(req.user._id);

    const { _id } = req.user;

    console.log(_id);
    const isExist = await LeaveTable.find({
      is_active: true,
      employeeid: _id,
      fromdate: fromdate,
      todate: todate,
    });

    console.log(isExist);
    if (isExist.length > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Leave already exists for the given date range.",
        });
    }
    const newLeave = new LeaveTable({
      employeeid: _id,
      type: type,
      reason: reason,
      fromdate: fromdate,
      todate: todate,
      pass: false,
    });

    await newLeave.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Leave applied successfully!",
        newLeave,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error While applying for leave" });
  }
};

exports.GetLeaveDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { _id } = req.user;

    // Count total matching leave records for pagination
    const totalLeaves = await LeaveTable.countDocuments({ is_active: true, employeeid: _id });

    // Fetch paginated leave records
    const leavedetails = await LeaveTable.find({ is_active: true, employeeid: _id })
      .populate('employeeid', 'employeecode firstname lastname emailid')
      .skip(skip)
      .limit(limit);

    if (leavedetails.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No leave records found',
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      });
    }

    const result = leavedetails.map((leave, index) => {
      const employee = leave.employeeid;
      return {
        id: skip + index + 1,
        leaveid: leave._id,
        leaveType: leave.type,
        employeeName: `${employee.firstname} ${employee.lastname}`,
        fromDate: leave.fromdate.toISOString().split('T')[0],
        toDate: leave.todate.toISOString().split('T')[0],
        reason: leave.reason,
        status: leave.leave_status,
        statusid: leave.statusid,
      };
    });

    res.status(200).json({
      success: true,
      message: 'Leaves retrieved successfully',
      data: result,
      pagination: {
        total: totalLeaves,
        page,
        limit,
        totalPages: Math.ceil(totalLeaves / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving leaves',
      error,
    });
  }
};

