const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { generateAttendanceExcel } = require('../utils/excelService');

// Mark attendance when a student scans QR
router.post('/mark', async (req, res) => {
    try {
        console.log('Received QR Scan Data:', req.body);
        const { eventId, firstName, lastName, rollNumber, department } = req.body;

        if (!eventId || !firstName || !lastName || !rollNumber || !department) {
            return res.status(400).json({ message: 'Missing eventId or studentId' });
        }

        // Check if attendance is already recorded
        const existingRecord = await Attendance.findOne({ eventId, firstName, lastName, rollNumber, department });
        if (existingRecord) {
            return res.status(400).json({ message: 'Attendance already marked' });
        }

        // Create a new attendance entry
        const attendance = new Attendance({ eventId, firstName, lastName, rollNumber, department });
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
        const attendanceRecords = await Attendance.find({ eventId });
        console.log(attendanceRecords);
        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }
        const attendanceData = attendanceRecords.map(record => ({
            'First Name': record.firstName,
            'Last Name' : record.lastName,
            'Roll Number': record.rollNumber,
            'Branch': record.department,
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
