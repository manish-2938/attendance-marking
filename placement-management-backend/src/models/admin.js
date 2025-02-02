const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true,  unique: true },
  password: { type: String, required: true },
});

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hashing password
  }
  next();
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // Comparing hashed password
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
