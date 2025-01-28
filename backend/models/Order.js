const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notes', required: true }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);