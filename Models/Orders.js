const mongoose = require('mongoose');
// user schema
const orderSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default : null
        },
        vendorId: [{
            type: mongoose.Types.ObjectId,
            ref: "Vendor",
            required: true
        }],
        cartItems:{
            type: Array,
            default: [],
            required: true
        },
        cartTotal: {
            type: Number,
            default: 0,
            required: true
        },
        name:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        phone: {
            type: Number,
            required: true,
        },

        paymentMethod:{
            type: String,
            required:true,
        },

        orderDelivered:{
            type: Boolean,
            default:false,
        },
        vendorAccepted:{
            type: Boolean,
            default:false,
        },
        vendorDelivered:{
            type: Boolean,
            default:false,
        }
    },
    {
        timestamps: true,
    }
    );
module.exports = mongoose.model('Orders', orderSchema);