const express = require("express");
const {authCheck,admin} = require("../middlewares/authMiddleware");

const router = express.Router();
const {list,read,create,getOrderDetail,updateOrderToPaid,getMyOrders,updateOrderToDelivered} = require('../controllers/order')
// router.get('/order/:orderId',authCheck,read)
router.post('/order',authCheck,create)
router.get('/order/:orderId',authCheck,getOrderDetail)
router.get('/myorders',authCheck,getMyOrders)
router.put('/order/:orderId/pay',authCheck,updateOrderToPaid)
router.put('/order/:orderId/deliver',authCheck,admin,updateOrderToDelivered)
// router.get('/orders',authCheck,list)
module.exports = router;
