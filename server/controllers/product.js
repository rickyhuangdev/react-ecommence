const Product = require("../models/products");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
       req.body.slug = slugify(req.body.title)
        res.json(await new Product(req.body).save());
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.list = async (req, res) =>
    res.json(await Product.find({}).sort({ createdAt: -1 }).exec());

exports.listAll = async (req, res) => {
    const products = await Product.find({}).limit(parseInt(req.params.count)).populate('category').populate('subs').sort([['createdAt', "desc"]]).exec()
    res.json(products);
};
exports.read = async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug})
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
};

exports.update = async (req, res) => {
    req.body.slug = slugify(req.body.title);
    try {
        const updated = await Product.findOneAndUpdate(
            {slug: req.params.slug},
            req.body,
            {new: true}
        ).exec();
        res.json(updated);
    } catch (err) {
        res.status(400).send("Create update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({_id: req.params.id});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Create delete failed");
    }
};

exports.list = async (req, res) => {
    try {
        const {sort, order, limit} = req.body
        res.json(await Product.find({}).populate('category').populate('subs').sort([[sort, order]]).limit(limit).exec());
    } catch (err) {
        res.status(400).send(err);
    }
};
exports.productStar = async (req, res) => {
    try {
        const product = await Product.findById({_id: req.params.id}).exec()
        const user = await User.findOne({email: req.user.email}).exec()
        const {star} = req.body
        let existingRatingObject = product.ratings.find((item) => item.postedBy.toString() === user._id.toString())
        if (existingRatingObject === 'undefined') {
            let ratingAdded = await Product.findOneAndUpdate(product._id, {
                $push: {ratings: {star, postedBy: user._id}}
            }, {new: true}).exec()
            console.log("rating added")
            res.json(ratingAdded)
        } else {
            let ratingUpdated = await Product.updateOne(
                {
                    ratings: {$elemMatch: existingRatingObject}
                }, {$set: {"ratings.$.star": star}}, {
                    new: true
                }
            ).exec()
            console.log("rating Updated")
            res.json(ratingUpdated)
        }

    } catch
        (err) {
        res.status(400).send(err);
    }
}
;

