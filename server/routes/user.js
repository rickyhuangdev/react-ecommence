const express = require("express");
const router = express.Router();

// middlewares
const {authCheck} = require("../middlewares/auth");

// controller
const {
    saveAddress
} = require("../controllers/user");

// routes
router.post("/user/address", authCheck, saveAddress);


module.exports = router;
