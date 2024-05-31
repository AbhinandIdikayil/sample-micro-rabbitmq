import { orderEntity } from "../../../../domain/enitities"
import { orderModel } from "../model/orderModel"


export const listOrder = async (): Promise<orderEntity[] | null> => {
    try {
        const order: orderEntity[]  = await orderModel.find();
        return order
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}