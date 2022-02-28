const Product = require("../models/products");
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
