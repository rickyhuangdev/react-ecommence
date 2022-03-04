const express = require("express");
const router = express.Router();

// middlewares
const {authCheck} = require("../middlewares/auth");

// controller
const {
    authUser,
    saveAddress
} = require("../controllers/userController");

// routes
router.post("/user/address", authCheck, saveAddress);
router.post("/login", authUser);


module.exports = router;
