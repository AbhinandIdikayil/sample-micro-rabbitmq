import { buyProductEntity } from "../../../../domain/entities";
import { productModel } from "../model/productModel";


export const buyProduct = async (data:buyProductEntity): Promise<object | null> => {
    try {
        const id = data;
        let product = await productModel.findById(id) 
        if(product){
            product.stock -= 1 
            let details = {
                _id:product._id,
                name:product?.name,
                desc:product?.desc,
                price:product?.desc
            } 
            await product.save()
            return details as object
        } else {
            return {"message":"failed"} as object
        }

    } catch (error: any) {
        throw new Error(error)
    }
}