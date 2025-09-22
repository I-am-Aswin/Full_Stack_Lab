import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "#app/models/User.js";

const protect = asyncHandler( async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if ( !authHeader || !authHeader.startsWith('Bearer ') ) {
        res.status(401).json({message: "Unauthorized user"});
        throw new Error("User Not Authorized, Token Missing");
    }

    const token = authHeader.split(' ')[1];

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // User Data is attached with request
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch ( err ) {
        res.status(401);
        throw new Error("User not Authorized, token failed");
    }
});

export default protect