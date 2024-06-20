import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { signupValidation } from "../../utils/validation";


export const signupController = (dependencies:IDependencies) => {
    const {usecases:{signupUserUseCase}} = dependencies
    return async(req:Request , res:Response) => {
        try {
            let {value , error} = signupValidation.validate(req.body)
            if(error){
                return res.status(400).json(error.message);
            }
            let data = {
                name:value?.name,
                email:value?.email,
                password:value?.password
            }
            let user = await signupUserUseCase(dependencies).execute(data)
            if(user) {
                return res.status(200).json(user)
            } else {        
                return res.status(400).json('incrorrect credentials')
            }
            res.status(200).json(user);
        } catch (error: any) {
            throw new Error(error)
        }
    }
}