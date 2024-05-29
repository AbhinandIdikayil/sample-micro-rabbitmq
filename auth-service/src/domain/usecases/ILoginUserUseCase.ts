import { userLoginEntity } from "../entities";


export interface ILoginUserUseCase {
    execute(data:userLoginEntity): Promise<userLoginEntity | null>
}