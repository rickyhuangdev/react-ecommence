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
    paidAt: Date,
    isPaid: {
        type: Boolean,
        default: false
    },
    orderedBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    coupons:[
        {
            coupon_id: String,
            name:String,
            discount:String
        }
    ],
    address: {
        country: String,
        email: String,
        firstName: String,
        lastName: String,
        companyName: String,
        phone: String,
        address: String,
    },
    paymentResult:{

    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    DeliveredAt:{
        type:Date,
    },
    paymentMethod:{
        type:String
    },
    orderStatus:{
        type:Number,
        default:0
    }
}, {timestamps: true})

module.exports = mongoose.model("Order", orderSchema)
