const Cart = require("../models/cart");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/order")
const Coupon = require("../models/coupon");


exports.create = async (req, res) => {
    const {address} = req.body
    const user = await User.findOne({email: req.user.email}).exec()
    const {cartTotal, totalAfterDiscount, products, orderedBy} = await Cart.findOne({orderedBy: user._id}).exec();
    let newOrder = await  new Order({
             cartTotal,
            totalAfterDiscount,
            products,
            orderedBy,
            address
    }).save()
    return res.json({
        success:true
    })



}
exports.updateOrderStatus = async (req, res) => {
    const user = await User.findOne({email: req.user.email},{}).exec()
    const result = await Cart.findByIdAndUpdate(req.params.orderId).exec();
    // let newOrder = await  new Order({
    //     cartTotal,
    //     totalAfterDiscount,
    //     products,
    //     orderedBy,
    //     address
    // }).save()
    return res.json({
        success:true
    })



}

