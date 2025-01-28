// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'],default:'student'},
  orderedNotes: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Order', default: []}],
  starredNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notes', default: []}],
  otp: { type: String, default: '' },
  otpExpiry: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);

