const Attendance = require('../models/Attendance');
const Student = require('../models/student');
const Event = require('../models/event');
const { generateAttendanceExcel } = require('../utils/excelService');

exports.exportAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;

        const attendanceRecords = await Attendance.find({ eventId });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Convert attendance data to a format suitable for Excel
        const attendanceData = attendanceRecords.map(record => ({
            'Student Name': record.firstName + record.lastName,
            'Roll Number': record.rollNumber,
            'Branch': record.department,
            'Timestamp': record.timestamp.toLocaleString(),
        }));

        const filePath = generateAttendanceExcel(attendanceData, `attendance_${eventId}.xlsx`);
        res.download(filePath);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error exporting attendance', error: error.message });
    }
};
