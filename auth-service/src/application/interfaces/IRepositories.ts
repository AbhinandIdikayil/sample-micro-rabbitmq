import { userEntity, userLoginEntity } from "../../domain/entities";



export interface IRepositories {
    signupUser:(data:userEntity) => Promise<userEntity  | null>,
    loginUser:(data:userLoginEntity) => Promise<userEntity | null> 
}