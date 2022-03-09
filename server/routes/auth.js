const express = require("express");

const router = express.Router();

// middlewares
const {authCheck, admin} = require("../middlewares/authMiddleware");

// controller
const {createOrUpdateUser, currentUser} = require("../controllers/auth");

router.post("/user/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/user/current-user", authCheck, currentUser);
router.post("/user/current-admin", authCheck, admin, currentUser);

module.exports = router;
