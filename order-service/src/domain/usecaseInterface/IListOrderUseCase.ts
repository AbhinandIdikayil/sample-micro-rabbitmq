import { orderEntity } from "../enitities";



export interface IListOrderUseCase {
    execute(): Promise<orderEntity[] | any>
}