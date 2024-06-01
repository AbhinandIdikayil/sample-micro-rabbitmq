import { orderEntity } from "../../domain/enitities"
import { IDependencies } from "../interfaces/IDependencies"


export const listOrderUseCase = (dependencies: IDependencies) => {
    const { repositories: { listOrder } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await listOrder(id)
            } catch (error) {
                console.log(error)
            }
        }
    }
}