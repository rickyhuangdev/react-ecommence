const expressAsyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const User = require("../models/userModel");
const slugify = require("slugify");

exports.create = expressAsyncHandler(async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title)
        res.json(await new ProductModel(req.body).save());
    } catch (err) {
        res.status(400).json(err);
    }
});

exports.list = expressAsyncHandler(async (req, res) =>
    res.json(await ProductModel.find({}).sort({createdAt: -1}).exec()));

exports.listAll = expressAsyncHandler(async (req, res) => {
    const products = await ProductModel.find({}).limit(parseInt(req.params.count)).populate('category').populate('subs').sort([['createdAt', "desc"]]).exec()
    res.json(products);
});
exports.getProductById = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({slug: req.params.slug})
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
});

exports.update = async (req, res) => {
    req.body.slug = slugify(req.body.title);
    try {
        const updated = await ProductModel.findOneAndUpdate(
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
        const deleted = await ProductModel.findOneAndDelete({_id: req.params.id});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Create delete failed");
    }
};

exports.list = async (req, res) => {
    try {
        const {sort, order, limit} = req.body
        res.json(await ProductModel.find({}).populate('category').populate('subs').sort([[sort, order]]).limit(limit).exec());
    } catch (err) {
        res.status(400).send(err);
    }
};
exports.productStar = async (req, res) => {
    const product = await ProductModel.findById(req.params.productId).exec();
    const user = await User.findOne({email: req.user.email}).exec();
    const {star} = req.body;

    // who is updating?
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );

    // if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
        let ratingAdded = await ProductModel.findByIdAndUpdate(
            product._id,
            {
                $push: {ratings: {star, postedBy: user._id}},
            },
            {new: true}
        ).exec();
        console.log("ratingAdded", ratingAdded);
        res.json(ratingAdded);
    } else {
        // if user have already left rating, update it
        const ratingUpdated = await ProductModel.updateOne(
            {
                ratings: {$elemMatch: existingRatingObject},
            },
            {$set: {"ratings.$.star": star}},
            {new: true}
        ).exec();
        console.log("ratingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }
};


exports.listRelated = async (req, res) => {
    const product = await ProductModel.findById(req.params.productId).exec();

    const related = await ProductModel.find({
        _id: {$ne: product._id},
        category: product.category,
    })
        .limit(3)
        .populate("category")
        .populate("subs")
        .exec();

    res.json(related);
};
const handleQuery = expressAsyncHandler(async (req, res, query) => {
    const products = await ProductModel.find({$text: {$search: query}})
        .populate('category', '_id name').exec()
    console.log(products)
    if (products) {
        res.json(
            products
        )
    } else {
        res.json(400)
        throw new Error("No Search Result Found")
    }


})
const handlePrice = expressAsyncHandler(async (req, res, price) => {
    const products = await ProductModel.find(
        {
            price:{
                $gte:price[0],
                $lte:price[1]
        }}).populate('category', '_id name').exec()
    if (products) {
        res.json(
            products
        )
    } else {
        res.json(400)
        throw new Error("No Search Result Found")
    }


})
const handleCategory = expressAsyncHandler(async (req, res, category) => {
    const products = await ProductModel.find(
        {category}).populate('category', '_id name').exec()
    if (products) {
        res.json(
            products
        )
    } else {
        res.json(400)
        throw new Error("No Search Result Found")
    }


})
const handleStar = expressAsyncHandler((req, res, stars) => {
    ProductModel.aggregate(([
        {
            $project: {
                document: "$$ROOT",
                floorAverage: {
                    $floor: {$avg: "$ratings.star"},
                }
            }
        },
        {
            $match: {floorAverage: stars}
        }
    ])).limit(15).exec((err, arg) => {
        if (err) console.log(err)
        ProductModel.find({_id: arg}).populate('category', '_id name').exec((err, products) => {
            if (err) console.log(err)
            if (products) {
                res.json(
                    products
                )
            } else {
                res.json(400)
                throw new Error("No Search Result Found")
            }
        })
    })


})
exports.productSearch = expressAsyncHandler(async (req, res) => {
    const {query, price, category, stars} = req.body
    console.log(query)
    if (query) {
        await handleQuery(req, res, query)
    }
    if (price !== undefined) {
        await handlePrice(req, res, price)
    }
    if (category) {
        await handleCategory(req, res, category)
    }
    if (stars) {
        await handleCategory(req, res, category)
    }
});

