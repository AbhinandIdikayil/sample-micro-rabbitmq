import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const loginController = (dependencies:IDependencies) => {
    const {usecases:{loginUserUseCase}} = dependencies
    return async (req:Request , res:Response) => {
try {
    const data = req.body
    let user = await loginUserUseCase(dependencies).execute(data)
    if(user) {
        res.status(200).json(user)
    } else {
        res.status(400).json('incorrect credentials')
    }
    
} catch (error: any) {
    throw new Error(error)
}
    }
}