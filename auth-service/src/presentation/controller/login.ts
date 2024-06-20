import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import jwt from 'jsonwebtoken'
import { loginValidation } from "../../utils/validation";

export const loginController = (dependencies: IDependencies) => {
    const { usecases: { loginUserUseCase } } = dependencies
    return async (req: Request, res: Response) => {
        try {
            const { value, error } = loginValidation.validate(req.body)
            const data = {
                email:value?.email,
                password:value?.password
            }
            if(error) {
                return res.status(400).json(error.message)
            }

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
                res.status(400).json('incorrect email or password')
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }
}