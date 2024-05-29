import { IDependencies } from "../../application/interfaces/IDependencies"
import { loginController } from "./login"
import { signupController } from "./signup"


export const controller = (dependencies:IDependencies) => {
    return {
        signup:signupController(dependencies) , 
        login:loginController(dependencies)
    }
}