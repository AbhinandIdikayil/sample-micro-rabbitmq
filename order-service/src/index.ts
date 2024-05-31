import server from './presentation/server'


const startServer = async() => {
    try {
        server;
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
