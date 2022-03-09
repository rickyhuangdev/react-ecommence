const express = require("express");
const router = express.Router();

// middlewares
const {authCheck, admin} = require("../middlewares/authMiddleware");

// controller
const {
    authUser,
    saveAddress,
    getUserProfile,
    registerNewUser,
    updateUserProfile,
    getUsers,
    updateUser,
    getUserById,
    deleteUserById,
    addToWishlist,
    getWishlists,
    removeWishlist
} = require("../controllers/userController");

// routes
router.post("/user/address", authCheck, saveAddress);
router.post("/login", authUser);
router.post("/user", registerNewUser);
router.get("/user/profile", authCheck, getUserProfile);
router.put("/user/profile", authCheck, updateUserProfile);
router.get("/user", authCheck,admin, getUsers);
router.get("/user/:id", authCheck,admin, getUserById);
router.put("/user/:id", authCheck,admin, updateUser);
router.delete("/user/:id", authCheck,admin, deleteUserById);

router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlists", authCheck, getWishlists);
router.put("/user/:id/wishlist", authCheck, removeWishlist);


module.exports = router;
