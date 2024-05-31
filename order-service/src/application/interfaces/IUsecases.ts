import { IListOrderUseCase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    listOrderUseCase:(dependencies:IDependencies) => IListOrderUseCase
}