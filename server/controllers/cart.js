const Cart = require("../models/cart");
const Product = require("../models/products");
const User = require("../models/user");


exports.userCart = async (req, res) => {

    const {cart} = req.body
    let products = []
    const user = await User.findOne(({email: req.user.email})).exec()
    let cartExistByUser = await Cart.findOne({orderBy: user._id}).exec()
    if (cartExistByUser) {
        cartExistByUser.remove()
        console.log('removed cart')
    }
    for (let i = 0; i < cart.length; i++) {
        let object = {}
        object.product = cart[i].product._id
        object.count = cart[i].count
        object.color = cart[i].product.color
        let {price} = await Product.findById(cart[i].product._id).select('price').exec()
        object.price = price
        products.push(object)
    }
    let cartTotal = 0
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count
    }
    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id
    }).save()
    if (newCart) {
        res.json({
            success: true
        })
    }
}
exports.getUserCart = async (req, res) => {
    const user = await User.findOne(({email: req.user.email})).exec()
    let carts = await Cart.findOne(({orderedBy: user._id})).populate('products.product', "_id title price totalAfterDiscount").exec()
    const {products, cartTotal, totalAfterDiscount} = carts
    if (carts) {
        res.json({products, cartTotal, totalAfterDiscount})
    }else{
        res.json([])
    }
}
exports.clearCart = async (req, res) => {
    const user = await User.findOne(({email: req.user.email})).exec()
    let result = await Cart.deleteOne({orderedBy: user._id}).exec()
    if (result) {
        res.json({
            success: true
        })
    }
}
