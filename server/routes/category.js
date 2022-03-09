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
    getSubs
} = require("../controllers/category");

// routes
router.post("/category", authCheck, admin, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, admin, update);
router.delete("/category/:slug", authCheck, admin, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;
