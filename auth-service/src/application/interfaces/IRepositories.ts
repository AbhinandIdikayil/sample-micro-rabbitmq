import { userEntity } from "../../domain/enitities";


export interface IRepositories {
    loginUser:(data:userEntity) => Promise<userEntity | null>;
}