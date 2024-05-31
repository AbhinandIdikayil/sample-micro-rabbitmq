import { IAddProductUseCase, IBuyProductUseCase } from "../../domain/usecasesInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    addProductUseCase:(dependencies:IDependencies) => IAddProductUseCase,
    buyProductUseCase:(dependencies:IDependencies) => IBuyProductUseCase
}