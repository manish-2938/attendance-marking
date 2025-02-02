const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();

router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(400).json('Invalid username or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json('Invalid username or password');
    }

    res.status(200).json('Login successful');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;
