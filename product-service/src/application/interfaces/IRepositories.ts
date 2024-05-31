import { buyProductEntity, productEntity } from "../../domain/entities";


export interface IRepositories {
    addProduct:(data:productEntity) => Promise<productEntity | null>
    buyProduct:(data:buyProductEntity) => Promise<object | null>
}