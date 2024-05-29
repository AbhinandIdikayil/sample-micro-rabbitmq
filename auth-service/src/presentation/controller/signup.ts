import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const signupController = (dependencies:IDependencies) => {
    const {usecases:{signupUserUseCase}} = dependencies
    return async(req:Request , res:Response) => {
        try {
            let data = req.body
            let user = await signupUserUseCase(dependencies).execute(data)
            res.status(200).json(user);
        } catch (error: any) {
            throw new Error(error)
        }
    }
}