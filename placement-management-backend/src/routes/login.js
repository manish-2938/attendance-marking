const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const user = await User.findOne({ rollNumber });
    if (!user) {
      return res.status(400).json('Invalid roll number or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json('Invalid roll number or password');
    }

    res.status(200).json('Login successful');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;
