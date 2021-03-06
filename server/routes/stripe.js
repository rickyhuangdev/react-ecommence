const express = require("express");
const {authCheck} = require("../middlewares/authMiddleware");

const router = express.Router();
const {createPaymentIntent} = require('../controllers/stripe')
router.post('/create-payment-intent',authCheck,createPaymentIntent)
module.exports = router;
