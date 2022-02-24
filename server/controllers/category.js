const Category = require('../models/category')
const slugify = require('slugify')
exports.create = async (req, res) => {
    try {
        const {name} = req.body
        const category = await new Category({name, slug: slugify(name)}).save()
        res.json(category)
    } catch (e) {
        res.status(400).json(e)
    }
}
exports.list = async (req, res) => {
    try {
        const category = await Category.find({}).sort({createdAt: -1}).exec()
        res.json(category)
    } catch (e) {
        res.status(400).json(e)
    }
}
exports.read = async (req, res) => {
    try {
        const slug = req.params.slug
        const category = await Category.findOne({slug}).exec()
        res.json(category)
    } catch (e) {
        res.status(400).json(e)
    }
}
exports.update = async (req, res) => {
    try {
        const {name} = req.body
        const category = Category.findByIdAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)})
        res.json(category)
    } catch (e) {
        res.status().json(e)
    }
}
exports.remove = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({slug: req.params.slug})
        res.json(category)
    } catch (e) {
        res.status().json(e)
    }
}
