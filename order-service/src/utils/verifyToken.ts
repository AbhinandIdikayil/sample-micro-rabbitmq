import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
interface authenticatedRequest extends Request {
    user?:any
}

export const verifyToken = (req:authenticatedRequest ,res:Response , next:NextFunction) => {
    console.log(req.headers.cookies)

    const token = (Array.isArray(req.headers.cookies) ? req.headers.cookies[0] : req.headers.cookies)
    console.log(token)
    if(token) {
        try {
            jwt.verify(token,'SECRET',(err:unknown,decoded:unknown) => {
                if (err) {
                    return res.status(401).json({ message: "Failed to authenticate token" });
                }
                if(decoded) {
                    const id = decoded
                    console.log(id)
                    req.user = decoded
                    next();
                }
            })
        } catch (error) {
            console.log(error)

        }
    } else {
        res.status(401).json({"message":"access denied"})
    }
}