// models/Note.js
const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  locked:{type: Boolean, default: true}, 
  studentsBought: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
},

);

module.exports = mongoose.model('Notes', notesSchema);