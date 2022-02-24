const admin = require("../firebase");
const User = require("../models/user")
exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authorization);
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({
            err: "Invalid or expired token",
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