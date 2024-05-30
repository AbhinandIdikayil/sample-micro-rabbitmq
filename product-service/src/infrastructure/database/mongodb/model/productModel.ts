import mongoose, { Schema } from "mongoose";
import { productEntity } from "../../../../domain/entities";

const productSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
})

export const productModel = mongoose.model<productEntity>('product',productSchema)