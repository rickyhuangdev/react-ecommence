const express = require("express");
const router = express.Router();
const { authCheck, admin } = require("../middlewares/authMiddleware");
const {upload,remove}  = require("../controllers/cloudinary");
router.post('/uploadimages',authCheck, admin,upload);
router.post('/removeimage',authCheck, admin,remove);
module.exports = router
