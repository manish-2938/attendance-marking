const Student = require('../models/student');

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a student
const addStudent = async (req, res) => {
    const { firstName,lastName, rollNumber, department, yearOfPassing } = req.body;

    try {
        const newStudent = new Student({ firstName, lastName, rollNumber, department, yearOfPassing });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getStudents, addStudent };
