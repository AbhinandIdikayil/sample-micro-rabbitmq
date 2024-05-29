import { userLoginEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"


export const loginUserUseCase = (dependencies:IDependencies) => {
    const {repositories:{loginUser}} = dependencies
    return {
        execute:async (data:userLoginEntity) => {
            try {
                return await loginUser(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}
