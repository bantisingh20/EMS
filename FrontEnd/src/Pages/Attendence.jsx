 
import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Box, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import {
  GetEmployeePuchDetails,
  UserPunchIn,
  UserPunchOut
} from '../api/AttendenceApi';
import { handleError, handleSuccess } from './Common';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);
  const [pendingHours, setPendingHours] = useState(8);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState(null);
  const [punchHistory, setPunchHistory] = useState([]);
  const rowsPerPage = 5;

  const calculateTimeDiff = (inTime, outTime = null) => {
    const start = new Date(inTime);
    const end = outTime ? new Date(outTime) : new Date();
    const diff = (end - start) / (1000 * 60 * 60); // in hours
    return parseFloat(diff.toFixed(2));
  };

  const formatTimer = (startTime, currentTime) => {
    if (!startTime) return "00:00:00";
    const diff = Math.floor((currentTime - startTime) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const fetchAttendance = async (pageNumber = 0) => {
    try {
      const res = await GetEmployeePuchDetails(pageNumber);
      setAttendance(res || []);
      const today = new Date().toDateString();
      const todayRecord = res?.find(record => new Date(record.date).toDateString() === today);

      if (todayRecord) {
        const currentlyCheckedIn = todayRecord.inTime && !todayRecord.outTime;
        setIsCheckedIn(currentlyCheckedIn);
        setLastCheckInTime(currentlyCheckedIn ? new Date(todayRecord.inTime) : null);

        if (todayRecord.inTime && todayRecord.outTime) {
          const total = calculateTimeDiff(todayRecord.inTime, todayRecord.outTime);
          setTotalWorkingHours(total);
        } else {
          setTotalWorkingHours(todayRecord.totalworkinghrs || 0);
        }

        const history = [];
        if (todayRecord.inTime) {
          history.push({
            type: 'Check In',
            time: new Date(todayRecord.inTime).toLocaleTimeString()
          });
        }
        if (todayRecord.outTime) {
          history.push({
            type: 'Check Out',
            time: new Date(todayRecord.outTime).toLocaleTimeString()
          });
        }
        setPunchHistory(history);
      } else {
        setIsCheckedIn(false);
        setLastCheckInTime(null);
        setTotalWorkingHours(0);
        setPunchHistory([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      await UserPunchIn(now);
      setIsCheckedIn(true);
      setLastCheckInTime(now);
      fetchAttendance(page);
      handleSuccess('Checked in at ' + now.toLocaleTimeString());
    } catch (err) {
      handleError(err.response?.data?.message || err.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      await UserPunchOut(now);
      setIsCheckedIn(false);
      setLastCheckInTime(null);
      fetchAttendance(page);
      handleSuccess('Checked out at ' + now.toLocaleTimeString());
    } catch (err) {
      handleError(err.response?.data?.message || err.message || 'Check-out failed');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isCheckedIn && lastCheckInTime) {
      const hours = calculateTimeDiff(lastCheckInTime);
      setWorkingHours(hours);
      setPendingHours(Math.max(0, 8 - hours));
    } else {
      setWorkingHours(totalWorkingHours);
      setPendingHours(Math.max(0, 8 - totalWorkingHours));
    }
  }, [currentTime, lastCheckInTime, totalWorkingHours, isCheckedIn]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchAttendance(newPage);
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-screen grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Left: Table (3/4) */}
      <Box className="lg:col-span-3 bg-white rounded shadow p-4">
        <Typography variant="h6" gutterBottom>Attendance History</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Check In</strong></TableCell>
                <TableCell><strong>Check Out</strong></TableCell>
                <TableCell><strong>Total Hours</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const workHours = row.inTime && row.outTime ? calculateTimeDiff(row.inTime, row.outTime) : row.totalworkinghrs || 0;
                const isOvertime = workHours > 8;
                const isUnderTime = workHours < 8;
                const status = row.status || (workHours >= 8 ? 'Present' : (workHours === 0 ? 'Absent' : 'Pending'));
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                    <TableCell>{row.inTime ? new Date(row.inTime).toLocaleTimeString() : '-'}</TableCell>
                    <TableCell>{row.outTime ? new Date(row.outTime).toLocaleTimeString() : '-'}</TableCell>
                    <TableCell>{workHours.toFixed(2)} hrs</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        status === 'Present' ? 'bg-green-100 text-green-700' :
                        status === 'Absent' ? 'bg-red-100 text-red-700' :
                        isOvertime ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {status}{isOvertime ? ' (Overtime)' : isUnderTime && workHours > 0 ? ' (Pending)' : ''}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
              {attendance.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={attendance.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Box>

      {/* Right: Punch Panel */}
      <Box className="bg-white rounded shadow p-4 space-y-4">
        <Typography variant="h6">Punch Panel</Typography>

        <Box className="bg-gray-50 p-3 rounded text-center">
          <Typography variant="body2" color="textSecondary">
            {isCheckedIn ? 'Time Since Check-In' : 'Current Time'}
          </Typography>
          <Typography variant="h6" fontFamily="monospace">
            {isCheckedIn ? formatTimer(lastCheckInTime, currentTime) : currentTime.toLocaleTimeString()}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {currentTime.toLocaleDateString()}
          </Typography>
        </Box>

        {/* Summary Stats */}
        <Box className="bg-gray-100 p-3 rounded space-y-2">
          <Typography variant="body2" display="flex" justifyContent="space-between">
            <span>Total Working Time:</span>
            <strong>{workingHours.toFixed(2)} hrs</strong>
          </Typography>
          <Typography variant="body2" display="flex" justifyContent="space-between">
            <span>Work Done:</span>
            <strong>{workingHours.toFixed(2)} hrs</strong>
          </Typography>
          <Typography variant="body2" display="flex" justifyContent="space-between">
            <span>Pending:</span>
            <strong>{pendingHours.toFixed(2)} hrs</strong>
          </Typography>
          {workingHours > 8 && (
            <Typography variant="body2" className="text-green-700 font-semibold">Overtime: {(workingHours - 8).toFixed(2)} hrs</Typography>
          )}
          {workingHours < 8 && workingHours > 0 && (
            <Typography variant="body2" className="text-yellow-700 font-semibold">Under-time: {(8 - workingHours).toFixed(2)} hrs</Typography>
          )}
        </Box>

        <Box className="flex flex-col gap-2">
          <button
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`py-2 rounded font-bold ${
              isCheckedIn ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            disabled={!isCheckedIn}
            className={`py-2 rounded font-bold ${
              !isCheckedIn ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isCheckedIn ? 'Check Out' : 'Check In Required'}
          </button>
        </Box>

        {/* Punch History */}
        {punchHistory.length > 0 && (
          <Box className="bg-gray-50 p-3 rounded space-y-2">
            <Typography variant="body2" fontWeight="bold">Today’s Activity</Typography>
            {punchHistory.map((entry, idx) => (
              <Box key={idx} className="flex justify-between text-sm bg-white p-2 rounded border">
                <span className={entry.type === 'Check In' ? 'text-green-600' : 'text-blue-600'}>
                  {entry.type}
                </span>
                <span>{entry.time}</span>
              </Box>
            ))}
          </Box>
        )}

        {/* Status */}
        <Box className={`p-3 rounded text-center border-2 ${
          isCheckedIn ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
        }`}>
          <Typography variant="body2" fontWeight="bold" color={isCheckedIn ? 'green' : 'textSecondary'}>
            Status: {isCheckedIn ? 'Checked In' : 'Checked Out'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendancePage;
