const Cart = require("../models/cart");
const Product = require("../models/productModel");
const User = require("../models/userModel");


exports.userCart = async (req, res) => {

    const {cart} = req.body
    let products = []
    const user = await User.findById(req.user._id)
    let cartExistByUser = await Cart.findOne({user_id: user._id}).exec()
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
        user_id: user._id
    }).save()
    if (newCart) {
        res.json({
            success: true
        })
    }else{
        res.json({
            success: false
        })
    }

}
exports.getUserCart = async (req, res) => {
    const user = await User.findById(req.user._id)
    let carts = await Cart.findOne(({user_id: user._id})).populate('products.product', "_id title price totalAfterDiscount").exec()
    const {products, cartTotal, totalAfterDiscount} = carts
    if (carts) {
        res.json({products, cartTotal, totalAfterDiscount})
    }else{
        res.json([])
    }
}
exports.clearCart = async (req, res) => {
    let result = await Cart.findOneAndRemove({user_id: req.user._id}).exec()
    if (result) {
        res.json({
            success: true
        })
    }
}
