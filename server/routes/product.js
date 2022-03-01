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
    listAll,
    list,
    productStar,
    listRelated
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.get("/product/:slug", read);
// router.get("/category/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.post("/products", list);
router.put('/product/star/:productId',authCheck,productStar)
router.get('/product/related/:productId',listRelated)

module.exports = router;
