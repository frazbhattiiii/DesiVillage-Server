const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
})

module.exports = mongoose.model("Review", ReviewSchema)