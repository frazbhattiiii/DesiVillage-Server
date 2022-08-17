const express = require('express');
const router = express.Router();
const {registerController,activationController,
loginController,forgotPasswordController,resetPasswordController,googleLoginController,facebookLoginController} = require('../Controllers/authControllers');

router.post("/register", registerController);
router.post("/activation", activationController);
router.post("/login", loginController);
router.post("/forgot/password", forgotPasswordController);
router.put("/reset/password", resetPasswordController);
router.post("/login/google", googleLoginController);
router.post('/facebook/login',facebookLoginController);
module.exports = router;