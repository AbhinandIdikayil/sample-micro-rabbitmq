import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/micro-auth')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}