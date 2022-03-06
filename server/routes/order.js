const express = require("express");
const {authCheck} = require("../middlewares/authMiddleware");

const router = express.Router();
const {list,read,create,getOrderDetail,updateOrderToPaid,getMyOrders} = require('../controllers/order')
// router.get('/order/:orderId',authCheck,read)
router.post('/order',authCheck,create)
router.get('/order/:orderId',authCheck,getOrderDetail)
router.get('/myorders',authCheck,getMyOrders)
router.put('/order/:orderId/pay',authCheck,updateOrderToPaid)
// router.get('/orders',authCheck,list)
module.exports = router;
