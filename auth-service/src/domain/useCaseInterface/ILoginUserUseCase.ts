import { userEntity } from "../enitities";


export interface ILoginUserUseCase {
    execute(data:userEntity): Promise<userEntity | null>
}