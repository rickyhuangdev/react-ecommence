const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, admin } = require("../middlewares/authMiddleware");

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
router.post("/coupon", authCheck, admin, create);
router.get("/coupons", list);
router.get("/coupon/:couponId", read);
router.put("/coupon/:couponId", authCheck, admin, update);
router.post("/user/cart/coupon", authCheck, applyCoupon);
router.delete("/coupon/:couponId", authCheck, admin, remove);

module.exports = router;
