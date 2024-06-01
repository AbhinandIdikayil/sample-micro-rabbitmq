import { buyProductEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"



export const buyProductUseCase = (dependencies: IDependencies) => {
    const { repositories: { buyProduct } } = dependencies
    return {
        execute: async (data: buyProductEntity) => {
            try {
                return await buyProduct(data)
            } catch (error: any) {
                console.log(error)
                throw new Error(error)
            }
        }
    }
}