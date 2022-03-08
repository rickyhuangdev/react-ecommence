const admin = require("../firebase");
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const expressAsyncHandler = require("express-async-handler");
// exports.authCheck = async (req, res, next) => {
//     try {
//         let token = req.body.token ?? req.headers.authorization
//         const firebaseUser = await admin
//             .auth()
//             .verifyIdToken(token);
//         req.user = firebaseUser;
//         next();
//     } catch (err) {
//         res.status(401).json({
//             err
//         });
//     }
// };
exports.adminCheck = async (req, res, next) => {
    try {
        const {email} = req.user;
        const userInfo = await User.findOne({email})
        if (userInfo.role !== 'admin') {
            res.status(403).json({
                err: "Access denied",
            });
            return;
        }
        next();
    } catch (err) {
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
};

exports.authCheck = expressAsyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
           req.user = await User.findById(decoded.id).select('-password')
          next()
        } catch (e) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})
exports.admin = expressAsyncHandler(async (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else {
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
})
