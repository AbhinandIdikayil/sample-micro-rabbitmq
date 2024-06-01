import { orderEntity } from "../enitities";



export interface IListOrderUseCase {
    execute(id:string): Promise<orderEntity[] | any>
}