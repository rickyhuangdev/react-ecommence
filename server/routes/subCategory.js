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
} = require("../controllers/subCategory");

// routes
router.post("/subCategory", authCheck, admin, create);
router.get("/subCategories", list);
router.get("/subCategory/:slug", read);
router.put("/subCategory/:slug", authCheck, admin, update);
router.delete("/subCategory/:slug", authCheck, admin, remove);

module.exports = router;
