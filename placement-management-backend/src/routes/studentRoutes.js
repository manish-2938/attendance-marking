const express = require('express');
const { getStudents, addStudent } = require('../controllers/studentController');
const router = express.Router();

router.get('/getStudents', getStudents);
router.post('/addStudent', addStudent);

module.exports = router;
