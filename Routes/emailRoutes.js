const express = require('express')
const { sendEmail } = require ( "../Controllers/emailControllers" );
const router = express.Router()

router.post("/", sendEmail)

module.exports = router
