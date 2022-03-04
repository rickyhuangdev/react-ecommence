const mongoose = require("mongoose");

const {Schema} = mongoose

const orderSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
            price: Number
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    isPaid: {
        type: Number,
        default: 0
    },
    paidDate: Date,
    orderedBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    address: {
        country: String,
        email: String,
        firstName: String,
        lastName: String,
        companyName: String,
        phone: String,
        address: String,
    },
    paymentIntent:{

    },
    orderStatus:{
        type:Number,
        default:0
    }
}, {timestamps: true})

module.exports = mongoose.model("Order", orderSchema)
