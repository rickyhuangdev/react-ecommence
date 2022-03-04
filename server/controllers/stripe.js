const Coupon = require("../models/coupon");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/products");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KET)
exports.createPaymentIntent = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 500,
        currency: "usd",
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}
