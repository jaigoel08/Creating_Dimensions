const express = require('express');
const User = require('../models/User');
const Notes = require('../models/Notes');
const sendGrid = require('@sendgrid/mail');
const SEND_GRID_KEY = process.env.SEND_GRID_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
sendGrid.setApiKey(SEND_GRID_KEY);

exports.getNotes = async (req, res, next) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied. Student role required.' });
        }

        const notes = await Notes.find()
            .select('title subject discountPrice originalPrice locked')
            .lean();
        
        const processedNotes = notes.map(note => ({
            ...note,
            locked: !note.studentsBought?.includes(req.user.userId)
        }));

        res.status(200).json({ 
            notes: processedNotes,
            message: 'Notes fetched successfully' 
        });
    } catch (error) {
        next(error);
    }
};

exports.getMyNotes = async (req, res, next) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied. Student role required.' });
        }

        const notes = await Notes.find({ 
            studentsBought: req.user.userId,
            locked: false 
        }).lean();
        
        res.status(200).json({ 
            notes,
            message: 'My notes fetched successfully' 
        });
    } catch (error) {
        next(error);
    }
};

exports.postFeedback = async (req, res, next) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied. Student role required.' });
        }

        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ message: 'Name and message are required' });
        }

        const feedbackEmail = {
            to: SENDER_EMAIL,
            from: req.user.email,
            subject: `Feedback from ${name}`,
            text: message,
            html: `
                <h2>Feedback from Student</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${req.user.email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await sendGrid.send(feedbackEmail);
        
        res.status(200).json({ 
            message: 'Feedback sent successfully' 
        });
    } catch (error) {
        next(error);
    }
}; 