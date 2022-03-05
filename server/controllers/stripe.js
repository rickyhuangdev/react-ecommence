const Coupon = require("../models/coupon");
const User = require("../models/userModel");
const Order = require("../models/order");
const Product = require("../models/productModel");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KET)
exports.createPaymentIntent = async (req, res) => {
    const {couponApplied} = req.body
    console.log(req.user)
    const user = await User.findOne({email: req.user.email}).exec()
    const {cartTotal, totalAfterDiscount} = await Order.findOne({orderedBy: user._id, isPaid: 0}).exec()
    let finalAmount = 0
    if (totalAfterDiscount && couponApplied) {
        finalAmount = totalAfterDiscount
    } else {
        finalAmount = cartTotal
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount * 100,
        currency: "hkd",
    })
    console.log(paymentIntent)
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}
