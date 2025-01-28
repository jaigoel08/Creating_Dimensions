const express = require('express');
const User = require('../models/User');
const { validationResult } = require("express-validator");
const { nameValidator, emailValidator, passwordValidator, confirmPasswordValidator} = require("./validations");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendGrid = require('@sendgrid/mail');
const SEND_GRID_KEY = process.env.SEND_GRID_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
sendGrid.setApiKey(SEND_GRID_KEY);

exports.signup = [
    nameValidator,
    emailValidator,
    passwordValidator, 
    confirmPasswordValidator, 
   
    async (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists with this email' });
            }

            const { name, email, password, role} = req.body;
            
            
            if(!email || !name || !password){
                return res.status(400).json({ message: 'All fields are required' });
            }

            

            const hashedPassword = await bcryptjs.hash(password, 10);
            const user = new User({ 
                name, 
                email, 
                password: hashedPassword,
                role
            });
            
            try {
                const welcomeEmail = {
                    to: email,
                    from: SENDER_EMAIL,
                    subject: 'Welcome to Creative Dimensions',
                    html: `<p>Thank you ${name} for signing up with Creative Dimensions. We are glad to have you on board.</p>`
                };
                await user.save();
                await sendGrid.send(welcomeEmail);
                
               
                
            } catch (emailError) {
                console.error('Error sending welcome email:', emailError);
                // Continue even if welcome email fails
            }
            
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            next(error);
        }
    }
];


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });
        
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid email or password' });
        
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        

        res.status(200).json({ 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res , next) => {

  res.status(200).json( req.user );
};
exports.postDeleteUser = async (req, res, next) => {
   
  try {
    // const userId = req.params.id;
    if (!req.user) {
      return res.status(401).json({ message: 'You must be logged in to delete your account' });
    }
    const userId = req.user._id;

    const user = await User.findByIdAndDelete(userId);
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
exports.patchUpdateUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { name, password } = req.body;

        if (!name && !password) {
            return res.status(400).json({ message: 'Name or password is required for update' });
        }

        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (password) {
            updates.password = await bcryptjs.hash(password, 10);
        }
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to delete your account' });
          }

        const user = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, select: '-password' }
        );
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.postForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const resetPasswordEmail = {
            to: user.email,
            from: process.env.SENDER_EMAIL,
            subject: 'Password Reset',
            text: 'Enter this OTP to reset your password: ' + otp
        }

        const MILLIS_IN_MINUTE = 600000;
        user.otp = otp;
        user.otpExpiry = Date.now() + 20 * MILLIS_IN_MINUTE;
        await user.save();

        await sendGrid.send(resetPasswordEmail);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        next(error);
    }
};
exports.postResetPassword = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;
        
        if (!email || !otp || !password) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: 'No OTP request found. Please request a new OTP.' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        user.password = await bcryptjs.hash(password, 10);
        
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        next(error);
    }
};


