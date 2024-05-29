import { ILoginUserUseCase, IUserSignupUserUseCase } from "../../domain/usecases";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    signupUserUseCase:(dependencies:IDependencies) => IUserSignupUserUseCase
    loginUserUseCase:(dependencies:IDependencies) => ILoginUserUseCase
}