const Coupon = require("../models/coupon");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/productModel");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KET)
exports.createPaymentIntent = async (req, res) => {
    const {couponApplied} = req.body
    const user = await User.findOne({email: req.user.email}).exec()
    const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderedBy: user._id}).exec()
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
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}
