const admin = require("../firebase");
const User = require("../models/userModel")
exports.authCheck = async (req, res, next) => {
    try {
       let token = req.body.token ?? req.headers.authorization
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(token);
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({
            err
        });
    }
};
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
