import { buyProductEntity } from "../entities";



export interface IBuyProductUseCase {
    execute(data:buyProductEntity): Promise<object | null>
}