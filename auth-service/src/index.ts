
import { connectDB } from './infrastructure/database/dbConnection';
import server from './presentation/server'

(() => {
    try {
        connectDB()
            .then(() =>  console.log('db connected successfully'))
            .catch((err) => console.log(err))
        server;
    } catch (error) {
        console.log(error)
    }
})