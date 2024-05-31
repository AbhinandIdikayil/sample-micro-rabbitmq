import { orderEntity } from "../../domain/enitities";


export interface IRepositories {
    listOrder:() => Promise<orderEntity[] | null>
}