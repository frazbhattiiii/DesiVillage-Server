const mongoose = require('mongoose')

const arrayLimit = (val) => val.length <= 5

const foodItemSchema = new mongoose.Schema(
    {
        vendor_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Vendor"
        },
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        price: {
            type: Number,
            required: true
        },
        info: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        speciality: {
            type: String,
            required: true,
            trim: true
        },
        availability: {
            type: Boolean,
            default: true
        },
        delivery: {
            type: Boolean,
            default: true
        },
        freeDelivery: {
            type: Boolean,
            default: false
        },
        discount: {
            type: String,
            default: '0'
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["Cafe", "Fast Food", "Desert", "Desi", "Others"]
        },
        timeForDelivery: { type: Number, required: true },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        sizes: [{
            size: { type: String, lowercase: true, required: true },
            price: { type: Number, required: true },
            units: { type: String, required: true, trim: true },
        }],
        reviews: [ { type: mongoose.Types.ObjectId, required: true, ref: "Review" } ],
        imageURL: {
            type: [String],
            required: true
        },
        tags: { type: [{
                        type: String,
                        lowercase: true, 
                        trim: true, 
                        required: true 
                    }],
                 validate: [arrayLimit, `{PATH} exceeds the limit of 5`]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Food", foodItemSchema)