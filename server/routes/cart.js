const express = require("express");
const {authCheck} = require("../middlewares/auth");

const router = express.Router();
const {userCart} = require('../controllers/cart')
router.post('/cart',authCheck,userCart)
