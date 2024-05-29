import { userEntity } from "../../domain/enitities"
import { IDependencies } from "../interfaces/IDependencies"




export const loginUserCase = (dependencies:IDependencies) => {
    const {respositories:{loginUser}} = dependencies
    return {
        execute:async(data:userEntity) => {
            try {
               return await loginUser(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}