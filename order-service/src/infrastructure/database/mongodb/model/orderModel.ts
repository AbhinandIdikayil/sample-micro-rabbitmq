import mongoose, { Schema } from "mongoose";
import { orderEntity } from "../../../../domain/enitities";


const orderSchema = new Schema({
    orders: [{
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    userId: { type: String, },
    totalPrice: { type: Number}
})

export const orderModel = mongoose.model<orderEntity>('order',orderSchema)