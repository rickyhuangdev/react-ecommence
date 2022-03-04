const express = require("express");
const router = express.Router();

// middlewares
const {authCheck, protect} = require("../middlewares/authMiddleware");

// controller
const {
    authUser,
    saveAddress,
    getUserProfile
} = require("../controllers/userController");

// routes
router.post("/user/address", authCheck, saveAddress);
router.post("/login", authUser);
router.get("/user/profile", authCheck, getUserProfile);


module.exports = router;
