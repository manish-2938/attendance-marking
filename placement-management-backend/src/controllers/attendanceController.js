const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Event = require('../models/event');
const { generateAttendanceExcel } = require('../services/excelService');

exports.exportAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;

        const attendanceRecords = await Attendance.find({ eventId }).populate('studentId', 'name rollNumber branch');

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Convert attendance data to a format suitable for Excel
        const attendanceData = attendanceRecords.map(record => ({
            'Student Name': record.studentId.name,
            'Roll Number': record.studentId.rollNumber,
            'Branch': record.studentId.branch,
            'Timestamp': record.timestamp.toLocaleString(),
        }));

        const filePath = generateAttendanceExcel(attendanceData, `attendance_${eventId}.xlsx`);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting attendance', error: error.message });
    }
};
