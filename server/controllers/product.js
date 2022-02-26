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

// exports.read = async (req, res) => {
//     let category = await Category.findOne({ slug: req.params.slug }).exec();
//     res.json(category);
// };
//
// exports.update = async (req, res) => {
//     const { name,state } = req.body;
//     try {
//         const updated = await Category.findOneAndUpdate(
//             { slug: req.params.slug },
//             { name, slug: slugify(name),state },
//             { new: true }
//         );
//         res.json(updated);
//     } catch (err) {
//         res.status(400).send("Create update failed");
//     }
// };
//
// exports.remove = async (req, res) => {
//     try {
//         const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
//         res.json(deleted);
//     } catch (err) {
//         res.status(400).send("Create delete failed");
//     }
// };
