import mongoose from "mongoose"


export const connectDB = async() => {
    try {
        let db = await mongoose.connect('mongodb://localhost:27017/micro-auth')
        if(db) {
            console.log('success')
        }
    } catch (error: any) {
        throw new Error(error)
    }
}