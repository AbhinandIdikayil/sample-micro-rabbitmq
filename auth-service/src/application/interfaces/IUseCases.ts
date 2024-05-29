import { ILoginUserUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";


export interface IUseCases  {
    loginUserCase:(dependencies:IDependencies) => ILoginUserUseCase
}