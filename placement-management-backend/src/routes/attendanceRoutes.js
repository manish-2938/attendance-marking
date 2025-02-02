const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { generateAttendanceExcel } = require('../utils/excelService');

// Mark attendance when a student scans QR
router.post('/mark', async (req, res) => {
    try {
        console.log('Received QR Scan Data:', req.body);
        const { eventId, studentId } = req.body;

        if (!eventId || !studentId) {
            return res.status(400).json({ message: 'Missing eventId or studentId' });
        }

        // Check if attendance is already recorded
        const existingRecord = await Attendance.findOne({ eventId, studentId });
        if (existingRecord) {
            return res.status(400).json({ message: 'Attendance already marked' });
        }

        // Create a new attendance entry
        const attendance = new Attendance({ eventId, studentId });
        await attendance.save();

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
});

// Export attendance records to an Excel file
router.get('/export/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log(eventId);

        // Fetch attendance data
        const attendanceRecords = await Attendance.find({ eventId })
            .populate('studentId', 'firstName lastName rollNumber department');

        console.log(attendanceRecords);
        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Format data for Excel
        const attendanceData = attendanceRecords.map(record => ({
            'Student Name': record.studentId.firstName + " " + record.studentId.lastName,
            'Roll Number': record.studentId.rollNumber,
            'Branch': record.studentId.department,
            'Timestamp': Date.now(),
        }));
        console.log(attendanceData);

        const filePath = generateAttendanceExcel(attendanceData, `attendance_${eventId}.xlsx`);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting attendance', error: error.message });
    }
});

module.exports = router;
