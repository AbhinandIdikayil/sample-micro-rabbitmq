import { IDependencies } from "../interfaces/IDependencies"


export const listOrderUseCase = (dependencies: IDependencies) => {
    const { repositories: { listOrder } } = dependencies
    return {
        execute: async () => {
            try {
                return await listOrder()
            } catch (error) {
                console.log(error)
            }
        }
    }
}