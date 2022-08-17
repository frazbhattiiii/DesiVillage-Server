const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        location: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Admin", restaurantSchema)