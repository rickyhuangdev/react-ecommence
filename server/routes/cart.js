const express = require("express");
const {authCheck} = require("../middlewares/auth");

const router = express.Router();
const {userCart,getUserCart,clearCart} = require('../controllers/cart')
router.post('/cart',authCheck,userCart)
router.get('/cart',authCheck,getUserCart)
router.delete('/cart',authCheck,clearCart)
module.exports = router;
