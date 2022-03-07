const Coupon = require("../models/coupon");
const User = require("../models/userModel");
const Cart = require("../models/cart");

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

exports.applyCoupon = async (req, res) => {
    const {coupon} = req.body

    const validCoupon = await Coupon.findOne({name: coupon}).exec()
    if (validCoupon === null) {
        res.status(404)
        throw  new Error('No Coupon Found')
    }
    const user = await User.findById(req.user._id)
    let {
        products,
        cartTotal
    } = await Cart.findOne({user_id: user._id}).populate('products.product', "_id title price")
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2)
   await Cart.findOneAndUpdate({user_id: user._id}, {totalAfterDiscount:totalAfterDiscount}, {new: true}).exec()
    return res.json({
        success: true,
        message: "successfully Applied",
        data: totalAfterDiscount
    })
}

