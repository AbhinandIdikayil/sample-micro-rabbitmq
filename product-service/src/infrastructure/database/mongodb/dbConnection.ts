import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        let success = await mongoose.connect('mongodb://localhost:27017/micro-product')
        if(success){
            console.log('***** product db connected ****')
        }
    } catch (error: any) {
        throw new Error(error)
    }
}
