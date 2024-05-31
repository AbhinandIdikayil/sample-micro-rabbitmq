import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import jwt from 'jsonwebtoken'

export const loginController = (dependencies:IDependencies) => {
    const {usecases:{loginUserUseCase}} = dependencies
    return async (req:Request , res:Response) => {
try {
    const data = req.body
    let user = await loginUserUseCase(dependencies).execute(data)
    if(user) {
        const payload = {
            id:user?._id,
        }
        const token = jwt.sign(payload , 'SECRET', {expiresIn:'1h'});
        res.cookie("userJWT", token, {
            httpOnly: true,
        })
        let response = {
            email:user?.email,
            token:token
        }
        console.log(response)
        res.status(200).json(response)
    } else {
        res.status(400).json('incorrect credentials')
    }
    
} catch (error: any) {
    throw new Error(error)
}
    }
}