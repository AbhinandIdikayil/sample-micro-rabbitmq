import { IAddProductUseCase } from "../../domain/usecasesInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    addProductUseCase:(dependencies:IDependencies) => IAddProductUseCase
}