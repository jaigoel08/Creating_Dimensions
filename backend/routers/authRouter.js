const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authUser = require('../middleware/auth');

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/profile", authUser, authController.getProfile);
authRouter.delete("/delete", authUser, authController.postDeleteUser);
authRouter.patch("/update/:id", authUser, authController.patchUpdateUser);
authRouter.post("/forgot-password", authController.postForgotPassword);
authRouter.post("/reset-password", authController.postResetPassword);


module.exports = authRouter;
