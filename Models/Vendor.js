const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["Asian", "European", "Cafe", "Fast Food", "Desert", "Desi", "Others"]
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("Vendor", VendorSchema)
