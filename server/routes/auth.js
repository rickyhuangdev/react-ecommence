const express = require('express')
const router = express.Router()
const {createOrUpdateUser} = require('../controllers/auth')
const {authCheck} = require("../middlewares/auth");

router.get('/create-or-update-user', authCheck, createOrUpdateUser)

module.exports = router
