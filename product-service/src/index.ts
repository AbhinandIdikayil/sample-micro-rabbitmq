
import { connectDB } from './infrastructure/database/mongodb/dbConnection';
import server from './presentation/server'


const startServer = async () => {
    try {
        server;
        await connectDB()
    } catch (error:any) {
        console.log(error)
        process.exit(1)
    }
}
// docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 rabbitmq
startServer()