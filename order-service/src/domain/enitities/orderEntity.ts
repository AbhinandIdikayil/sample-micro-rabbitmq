import { ObjectId } from "mongoose";


export interface orderEntity {
    _id:ObjectId,
    orders: Array<{
        productId: string;
        name:string,
        desc:string,
        price:string
    }>;
    userId?: string,
    totalprice?: Number,
}