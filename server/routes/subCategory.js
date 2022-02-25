const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    read,
    update,
    remove,
    list,
} = require("../controllers/subCategory");

// routes
router.post("/sub", authCheck, adminCheck, create);
router.get("/subCategory", list);
router.get("/subCategory/:slug", read);
router.put("/subCategory/:slug", authCheck, adminCheck, update);
router.delete("/subCategory/:slug", authCheck, adminCheck, remove);

module.exports = router;
