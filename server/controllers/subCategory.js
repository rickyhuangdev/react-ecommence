const subCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const {name, parent} = req.body;
        // const category = await new Category({ name, slug: slugify(name) }).save();
        // res.json(category);
        res.json(await new subCategory({name, slug: slugify(name), parent}).save());
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

exports.list = async (req, res) =>
    res.json(await subCategory.find({}).sort({createdAt: -1}).exec());

exports.read = async (req, res) => {
    let category = await subCategory.findOne({slug: req.params.slug}).exec();
    res.json(category);
};

exports.update = async (req, res) => {
    const {name, state, parent} = req.body;
    try {
        const updated = await subCategory.findOneAndUpdate(
            {slug: req.params.slug},
            {name, slug: slugify(name), state, parent},
            {new: true}
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Create update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await subCategory.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Create delete failed");
    }
};
