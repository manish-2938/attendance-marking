const XLSX = require('xlsx');
const fs = require('fs');

const generateAttendanceExcel = (attendanceData, fileName) => {
    try {
        const worksheet = XLSX.utils.json_to_sheet(attendanceData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

        const filePath = `./exports/${fileName}`;
        XLSX.writeFile(workbook, filePath);

        return filePath;
    } catch (error) {
        throw new Error('Error generating Excel file: ' + error.message);
    }
};

module.exports = { generateAttendanceExcel };
