import { connectDB } from './infrastructure/database/mongodb/dbConnection';
import server from './presentation/server'


const startServer = async() => {
    try {
        // startnig server
        server; 
        await connectDB()
    } catch (error) {
        console.log(error); 
        process.exit(1) 
    } 
}

startServer();