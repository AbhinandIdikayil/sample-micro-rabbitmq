import { connectDB } from './infrastructure/database/mongodb/dbConnection';
import server from './presentation/server'


const startServer = async() => {
    try {
        server;
        await connectDB()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

startServer()