import { userEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";



export const signupUserUseCase = (dependencies: IDependencies) => {
    const {repositories:{signupUser}} = dependencies
    return {
        execute: async (data:userEntity) => {
            try {
                return await signupUser(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}