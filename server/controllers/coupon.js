const Coupon = require("../models/coupon");
const User = require("../models/userModel");
const Cart = require("../models/cart");
const expressAsyncHandler = require("express-async-handler");

exports.create = async (req, res) => {
    try {
        const {name, expiry, discount, state} = req.body
        res.json(await new Coupon({name, expiry, discount, state}).save());
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

exports.list = async (req, res) =>
    res.json(await Coupon.find({}).sort({createdAt: -1}).exec());

exports.read = async (req, res) => {
    let coupon = await Coupon.findById(req.params.couponId).exec();
    res.json(coupon);
};

exports.update = async (req, res) => {

    const {name, expiry, discount, state} = req.body;
    try {
        const updated = await Coupon.findOneAndUpdate(
            {_id: req.params.couponId},
            {name, expiry, discount, state},
            {new: true}
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Create update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Coupon.findByIdAndDelete(req.params.couponId).exec();
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Create delete failed");
    }
};

exports.applyCoupon = expressAsyncHandler(async (req, res) => {


    const {coupon} = req.body
    const validCoupon = await Coupon.findOne({name: coupon}).exec()

    if (!validCoupon) {
        res.status(404)
        throw new Error('No Coupon Found')

    }
    let today = new Date()
    let expiry = new Date(validCoupon.expiry)

    if (today > expiry || validCoupon.state === 0) {
        res.status(403)
        throw new Error('Invalid Coupon')


    }

    const user = await User.findById(req.user._id)

    let currentCart = await Cart.findOne({user_id: user._id}).populate('products.product', "_id title price")

    let currentPay = currentCart.totalAfterDiscount??currentCart.cartTotal
    let totalAfterDiscount = (currentPay - (currentPay * validCoupon.discount) / 100).toFixed(2)

    let existCouponArray = currentCart.coupons
    let isExistCouponIndex = existCouponArray.findIndex(item => {
        return item.name === validCoupon.name
    })
    if (isExistCouponIndex > -1) {
        res.status(403)
        throw new Error('Coupon already used')
    }
    existCouponArray.push({
        id: validCoupon._id.toString(),
        name: validCoupon.name,
        discount: validCoupon.discount,
    })
    const newCartUpdate = await Cart.findOneAndUpdate({user_id: user._id}, {
        totalAfterDiscount: totalAfterDiscount,
        coupons: existCouponArray
    }, {new: true}).exec()

    res.json({
        success: true,
    })

})

