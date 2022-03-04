const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddleware");

// controller
const {
    create,
    read,
    update,
    remove,
    list,
    applyCoupon
} = require("../controllers/coupon");

// routes
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.get("/coupon/:couponId", read);
router.put("/coupon/:couponId", authCheck, adminCheck, update);
router.post("/user/cart/coupon", authCheck, applyCoupon);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
