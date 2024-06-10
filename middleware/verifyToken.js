const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const config = require('config');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        console.log('Token:', token);

        const decoded = jwt.verify(token, config.get("JWT_SECRET"));

        console.log('Decoded:', decoded);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await UserModel.findById(decoded.userId).select("-password");

        console.log('User:', user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = verifyToken;