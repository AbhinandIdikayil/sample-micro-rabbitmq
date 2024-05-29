import mongoose, { Schema } from "mongoose";
import { userEntity } from "../../../../domain/entities";

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

export const userModel = mongoose.model<userEntity>('user',userSchema);