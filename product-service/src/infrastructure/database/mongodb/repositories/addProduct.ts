import { productEntity } from "../../../../domain/entities"
import { productModel } from "../model/productModel"



export const addProduct = async(data:productEntity): Promise<productEntity | null> => {
    try {
        let product = await productModel.create(data);
        return product as productEntity
    } catch (error: any) {
        throw new Error(error)
    }
}