const express = require('express');
const router = express.Router();
const {updateProfile, orderHistory} = require("../Controllers/profileControllers");

router.post("/profile", updateProfile);
router.post("/history", orderHistory);
module.exports = router;