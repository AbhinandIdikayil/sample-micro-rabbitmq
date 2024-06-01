import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import amqp from 'amqplib'


interface authenticatedRequest extends Request {
    user?: any
}

const connectToRabbitMQ = async () => {
    try {
        const connection: amqp.Connection = await amqp.connect(
            'amqp://localhost:5672'
        );
        const channel: amqp.Channel = await connection.createChannel();
        await channel.assertQueue("BUYED-PRODUCT");
        return channel;
    } catch (error: unknown) {
        console.error("Error connecting to RabbitMQ:", error);
    }
}; 

export const buyProductController = (dependencies: IDependencies) => {
    const { usecases: { buyProductUseCase } } = dependencies
    return async (req: authenticatedRequest, res: Response) => {
        try {
            const body = req.body
            const {id} = req.user
            let data = {
                ...body,
                userId:id
            }
            let product = await buyProductUseCase(dependencies).execute(data)

            const sendToRabbitmq = async<T>(data:T) => {
                console.log(data)
                try {
                    const channel:amqp.Channel | undefined = await connectToRabbitMQ()
                    if(channel) {
                        channel.sendToQueue('ORDER', Buffer.from(JSON.stringify(data)));
                        console.log('--- data send to order queue ---')

                        // and consuming the queue from the order service
                        await channel.consume('BUYED-PRODUCT',
                        async (msg:amqp.ConsumeMessage | null) => {
                            if(msg != null) {
                                const message =JSON.parse(msg.content.toString())
                                if(message){
                                    res.status(200).json(message)
                                }  
                                channel.ack(msg);
                            }
                        }
                        )   
                    }    
                } catch (error) {  
                    console.log(error)
                }
            }

            sendToRabbitmq(product)
            return product
        } catch (error: any) {
            console.log(error)
            throw new Error(error) 
        }
    }
} 