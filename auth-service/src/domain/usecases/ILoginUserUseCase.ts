import { userEntity, userLoginEntity } from "../entities";


export interface ILoginUserUseCase {
    execute(data:userLoginEntity): Promise<userEntity | null>
}