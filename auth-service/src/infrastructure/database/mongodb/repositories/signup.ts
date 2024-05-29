import { userEntity } from "../../../../domain/entities";
import { userModel } from "../model/userModel";



export const signupUser = async (data: userEntity): Promise<userEntity | null> => {
    try {
        const user = await userModel.create(data);
        return user as userEntity
    } catch (error: any) {
        throw new Error(error)
    }
}