const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, admin } = require("../middlewares/authMiddleware");

// controller
const {
    create,
    getProductById,
    update,
    remove,
    listAll,
    list,
    productStar,
    listRelated,
    productSearch
} = require("../controllers/productController");

// routes
router.post("/product", authCheck, admin, create);
router.route("/products/:count").get(listAll);
router.get("/product/:slug", getProductById);
// router.get("/category/:slug", read);
router.put("/product/:slug", authCheck, admin, update);
router.delete("/product/:slug", authCheck, admin, remove);
router.post("/products", list);
router.put('/product/star/:productId',authCheck,productStar)
router.get('/product/related/:productId',listRelated)
router.post("/products/search", productSearch);

module.exports = router;
