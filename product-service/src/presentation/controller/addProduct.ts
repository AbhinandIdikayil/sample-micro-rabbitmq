import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";



export const addProductController = (dependencies: IDependencies) => {
    const { usecases: { addProductUseCase } } = dependencies
    return async (req: Request, res: Response) => {
        try {
            const data = req.body
            const product = await addProductUseCase(dependencies).execute(data)
            res.status(200).json(product)
        } catch (error) {
            console.log(error)
        }
    }
}