import { ObjectId } from "mongoose";


export interface productEntity {
    _id?:ObjectId,
    name:string,
    desc:string, //description
    stock:number,
    price:number,
}