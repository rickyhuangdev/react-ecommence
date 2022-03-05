const Cart = require("../models/cart");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/order")
const Coupon = require("../models/coupon");
const expressAsyncHandler = require("express-async-handler");

exports.create = expressAsyncHandler(async (req, res) => {
    const {country,email,phone,firstName,lastName,companyName,postCode,address} = req.body.address
    const user = await User.findById(req.user._id).exec()
    const {cartTotal, totalAfterDiscount, products, orderedBy} = await Cart.findOne({orderedBy: user._id}).exec();
    let newOrder = await new Order({
        cartTotal,
        totalAfterDiscount,
        products,
        orderedBy,
        address:{
            country,
            email,
            phone,
            firstName,
            lastName,
            companyName,
            postCode,
            address
        }
    }).save()
    return res.json({
        success: true,
        data: newOrder

    })


})
exports.getOrderDetail = expressAsyncHandler(async (req, res) => {

    try {
        const order = await Order.findById(req.params.orderId).populate('products.product', "_id title price totalAfterDiscount images slug").exec()
        if (order) {
            if (order.orderedBy.toString() === req.user._id.toString()) {
                return res.json({
                    success: true,
                    data: order
                })
            } else {
                res.status(401)
                throw  new Error('Unauthorized Access')
            }

        } else {
            res.status(404)
            throw  new Error('No Order Found')
        }
    } catch (e) {
        res.status(404)
        throw  new Error('No Order Found')
    }


})
exports.updateOrderToPaid = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId)
    const result = await Cart.findByIdAndUpdate(req.params.orderId).exec();
   if(order){
       order.isPaid = true
       order.paidAt = Date.now()
       order.paymentResult = {
           id:req.body.id,
           status:req.body.status,
           update_time:req.body.update_time,
           email_address:req.body.payer.email_address
       }
       const updatedOrder = await order.save()
       res.json(updatedOrder)
   }else{
       res.status(404)
       throw  new Error('No Order Found')
   }



})

