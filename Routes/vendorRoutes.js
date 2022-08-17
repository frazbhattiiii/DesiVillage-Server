const express = require('express') 
const router = express.Router()
const { registerVendor, getVendor, updateVendor, getOrders, validateOrder, deliverOrder } = require('../Controllers/vendorController')

router.get("/:vendor_id", getVendor)
router.get("/orders/:vendor_id", getOrders)
router.post("/orders/validate/:order_id", validateOrder)
router.post("/orders/deliver/:order_id", deliverOrder)
router.post("/register", registerVendor)
router.patch("/:vendor_id", updateVendor)

module.exports = router