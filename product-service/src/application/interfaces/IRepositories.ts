import { productEntity } from "../../domain/entities";


export interface IRepositories {
    addProduct:(data:productEntity) => Promise<productEntity | null>
}