import { orderEntity } from "../../domain/enitities";


export interface IRepositories {
    listOrder:(id:string) => Promise<orderEntity[] | null>
}