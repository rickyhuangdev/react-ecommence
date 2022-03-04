const express = require("express");
const {authCheck} = require("../middlewares/auth");

const router = express.Router();
const {list,read,create} = require('../controllers/order')
// router.get('/order/:orderId',authCheck,read)
router.post('/order',authCheck,create)
// router.get('/orders',authCheck,list)
module.exports = router;
