import express, { Application } from 'express'
import {port} from '../config/envConfig/config'
import { orderRoute } from '../infrastructure/routes/orderRoute';
import { dependencies } from '../config/dependencies';
import {rabbitmqController} from '../infrastructure/rabbitmq/index'

const app:Application = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}));

rabbitmqController()
app.use(orderRoute(dependencies))

const PORT = port || 5000

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})


export default app