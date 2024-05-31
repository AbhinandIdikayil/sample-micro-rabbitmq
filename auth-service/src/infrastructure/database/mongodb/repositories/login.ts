import { userEntity, userLoginEntity } from "../../../../domain/entities";
import { userModel } from "../model/userModel";



export const loginUser = async (data: userLoginEntity): Promise<userEntity | null> => {
try {
    const {email,password} = data
    let user = await userModel.findOne({email});
    if(user){
        if(user.password === password) {
            return user as userEntity
        }
    }
    return null
} catch (error: any) {
    throw new Error(error)
}
}