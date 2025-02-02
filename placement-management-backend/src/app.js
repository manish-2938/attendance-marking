const express = require('express');
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const adminLogin = require('./routes/adminLogin');
const adminSignup = require('./routes/adminSignup');
const cors = require('cors');
const connectDB = require('./config/db');
const attendance = require('./routes/attendanceRoutes');
const path = require('path');

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api/', adminLogin);
app.use('/api/', adminSignup);
app.use('/api/attendance', attendance);

// Serve exported Excel files
app.use('/api/attendance/exports', express.static(path.join(__dirname, 'exports')));
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
