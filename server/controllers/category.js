const Category = require("../models/category");
const subCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        // const category = await new Category({ name, slug: slugify(name) }).save();
        // res.json(category);
        res.json(await new Category({ name, slug: slugify(name) }).save());
    } catch (err) {
         console.log(err);
        res.status(400).json(err);
    }
};

exports.list = async (req, res) =>
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
};

exports.update = async (req, res) => {
    const { name,state } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name),state },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Create update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Create delete failed");
    }
};

exports.getSubs = async (req, res) => {
    try {
       subCategory.find({parent:req.params._id}).exec((error,result)=>{
           if(error){
               console.log(error)
           }
           res.json(result)
       })

    } catch (err) {
        res.status(400).send("Create delete failed");
    }
};

