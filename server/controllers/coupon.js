const Coupon = require("../models/coupon");

exports.create = async (req, res) => {
    try {
        const {name, expiry, discount} = req.body
        res.json(await new Coupon({name, expiry, discount}).save());
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


