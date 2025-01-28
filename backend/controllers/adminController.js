const express = require('express');
const User = require('../models/User');
const Notes = require('../models/Notes');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-powerpoint' || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    || file.mimetype === 'application/vnd.oasis.opendocument.text' || file.mimetype === 'application/vnd.oasis.opendocument.spreadsheet' || file.mimetype === 'application/vnd.oasis.opendocument.presentation' || file.mimetype === 'application/vnd.oasis.opendocument.graphics' || file.mimetype === 'application/vnd.oasis.opendocument.text-template' || file.mimetype === 'application/vnd.oasis.opendocument.text-master' || file.mimetype === 'application/vnd.oasis.opendocument.text-web' || file.mimetype === 'application/vnd.oasis.opendocument.graphics-template' || file.mimetype === 'application/vnd.oasis.opendocument.graphics-web' || file.mimetype === 'application/vnd.oasis.opendocument.presentation-template' || file.mimetype === 'application/vnd.oasis.opendocument.presentation-web' || file.mimetype === 'application/vnd.oasis.opendocument.spreadsheet-template' || file.mimetype === 'application/vnd.oasis.opendocument.spreadsheet-web'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024 // 1GB limit
  }
});

exports.getUsers = async (req, res, next) => {
    try {
        
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to access this resource' });
        }

        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

exports.postUploadNotes = [
    upload.single('pdfFile'),
    async (req, res, next) => {
        try {
            console.log('Request body:', req.body);
            console.log('Request file:', req.file);
            console.log('Request user:', req.user);

            if (!req.file) {
                return res.status(400).json({ message: 'No file provided' });
            }

            const { title, subject, originalPrice, discountPrice } = req.body;
            
            console.log('Received data:', {
                title,
                subject,
                originalPrice,
                discountPrice,
                filePath: req.file.path
            });

            if (!title || !subject || !originalPrice || !discountPrice) {
                return res.status(400).json({ 
                    message: 'All fields are required',
                    missing: {
                        title: !title,
                        subject: !subject,
                        originalPrice: !originalPrice,
                        discountPrice: !discountPrice
                    }
                });
            }

            if (!req.user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            // Ensure uploads directory exists
            const uploadsDir = 'uploads';
            if (!fs.existsSync(uploadsDir)){
                fs.mkdirSync(uploadsDir);
            }

            const note = new Notes({
                title,
                subject,
                pdfUrl: req.file.path,
                originalPrice: parseFloat(originalPrice),
                discountPrice: parseFloat(discountPrice),
                ownerId: req.user._id
            });


            const savedNote = await note.save();
           
            
            res.status(200).json({ 
                message: 'Notes uploaded successfully',
                note: {
                    _id: savedNote._id,
                    title: savedNote.title,
                    subject: savedNote.subject,
                    pdfUrl: savedNote.pdfUrl,
                    originalPrice: savedNote.originalPrice,
                    discountPrice: savedNote.discountPrice
                }
            });
        } catch (error) {
            console.error('Upload error:', error);
            console.error('Error stack:', error.stack);
            res.status(500).json({ 
                message: 'Error uploading notes',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }
];

exports.getNotes = async (req, res, next) => {
    try {
        
        const notes = await Notes.find();
        
        console.log('Found notes:', notes); 

        if (!notes || notes.length === 0) {
            return res.status(200).json({ 
                notes: [],
                message: 'No notes found' 
            });
        }

        res.status(200).json({ 
            notes: notes,
            message: 'Notes fetched successfully' 
        });
    } catch (error) {
        console.error('Error in getNotes:', error);
        res.status(500).json({ 
            message: 'Error fetching notes',
            error: error.message 
        });
    }
};

exports.deleteNotes = async (req, res, next) => {
    try {
        const noteId = req.params.id; // Get noteId from URL params
        console.log('Deleting note with ID:', noteId);

        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Delete the file from uploads folder
        if (note.pdfUrl) {
            const filePath = note.pdfUrl;
            try {
                fs.unlinkSync(filePath);
                console.log('File deleted successfully');
            } catch (err) {
                console.error('Error deleting file:', err);
            }
        }

        // Delete the note from database
        await Notes.findByIdAndDelete(noteId);
        
        res.status(200).json({ 
            message: 'Note deleted successfully',
            noteId: noteId 
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ 
            message: 'Error deleting note',
            error: error.message 
        });
    }
};

exports.patchUpdateNotes = async (req, res, next) => {
    try {
        const noteId = req.params.id; // Get noteId from URL params
        const { title, subject, originalPrice, discountPrice } = req.body;

        console.log('Updating note:', { noteId, title, subject, originalPrice, discountPrice });

        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        const updatedNote = await Notes.findByIdAndUpdate(
            noteId,
            {
                title,
                subject,
                originalPrice,
                discountPrice
            },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({
            message: 'Note updated successfully',
            note: updatedNote
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ 
            message: 'Error updating note',
            error: error.message 
        });
    }
};

