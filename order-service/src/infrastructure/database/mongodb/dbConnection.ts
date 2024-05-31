import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/micro-order')
    } catch (error) {
        console.log(error)
    }
}