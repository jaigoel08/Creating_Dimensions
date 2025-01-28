const express = require('express');
const authUser = require('../middleware/auth');
const studentController = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.get('/notes', authUser, studentController.getNotes);
studentRouter.get('/my-notes', authUser, studentController.getMyNotes);
studentRouter.post('/feedback', authUser, studentController.postFeedback);

module.exports = studentRouter;