import { userEntity } from "../entities";


export interface IUserSignupUserUseCase {
    execute(data:userEntity):Promise<userEntity | null>
}