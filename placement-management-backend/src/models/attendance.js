const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
