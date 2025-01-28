require('dotenv').config();

// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const sendGrid = require('@sendgrid/mail');
const fs = require('fs');

// Local Module
const authRouter = require('./routers/authRouter');
const adminRouter = require('./routers/adminRouter');
const studentRouter = require('./routers/studentRouter');
const conversationRouter = require('./routers/conversationRouter');

const MONGO_DB_URL =
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@airbnb.8bduv.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/student', conversationRouter);

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';

if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});

module.exports = app;