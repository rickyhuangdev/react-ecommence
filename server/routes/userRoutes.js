const express = require("express");
const router = express.Router();

// middlewares
const {authCheck, protect} = require("../middlewares/authMiddleware");

// controller
const {
    authUser,
    saveAddress,
    getUserProfile,
    registerNewUser,
    updateUserProfile
} = require("../controllers/userController");

// routes
router.post("/user/address", authCheck, saveAddress);
router.post("/login", authUser);
router.post("/user", registerNewUser);
router.get("/user/profile", authCheck, getUserProfile);
router.put("/user/profile", authCheck, updateUserProfile);


module.exports = router;
