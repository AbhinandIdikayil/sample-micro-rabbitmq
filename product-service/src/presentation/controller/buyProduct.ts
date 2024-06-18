import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import amqp from 'amqplib'
import CircuitBreaker from 'opossum'

interface authenticatedRequest extends Request {
    user?: any
}

const circuitBreakerOptions = {
    timeout: 15000,
    errorThresholdPercentage: 80,
    resetTimeout: 10000
};

const orderRequestBreaker = new CircuitBreaker(sendToRabbitmq, circuitBreakerOptions)


orderRequestBreaker.fallback(() => {
    return { status: 'fallback', message: 'Order service is unavailable, please try again later.' };
});

orderRequestBreaker.on('open', () => console.log('Circuit Breaker opened'));
orderRequestBreaker.on('close', () => console.log('Circuit Breaker closed'));
orderRequestBreaker.on('halfOpen', () => console.log('Circuit Breaker half-open'));
orderRequestBreaker.on('fire', () => console.log('Attempting to fire through Circuit Breaker'));



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


async function sendToRabbitmq<T>(data: T) {
    console.log(data)
    try {
        const channel: amqp.Channel | undefined = await connectToRabbitMQ()
        if (channel) {
            channel.sendToQueue('ORDER', Buffer.from(JSON.stringify(data)));
            console.log('--- data send to order queue ---')


            return new Promise((res, rej) => {
                // const timeout = setTimeout(() => {
                //     rej(new Error('Timeout waiting for response'))
                // }, 15000);

 
                // and consuming the queue from the order service
                channel.consume('BUYED-PRODUCT',
                    async (msg: amqp.ConsumeMessage | null) => {
                        if (msg != null) {
                            const message = JSON.parse(msg.content.toString())
                            if (message) {
                                res(message) 
                                // clearTimeout(timeout);
                                console.log(message, '----- message from BUYED-PRODUCT  QUEUE -----')
                            }
                             channel.ack(msg);
                        }
                    },
                    {noAck:false}
                )
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const buyProductController = (dependencies: IDependencies) => {
    const { usecases: { buyProductUseCase } } = dependencies
    return async (req: authenticatedRequest, res: Response) => {
        try {
            const body = req.body
            const { id } = req.user
            let data = {
                ...body,
                userId: id
            }
            let product = await buyProductUseCase(dependencies).execute(data)

            
            const result = await orderRequestBreaker.fire(product)
            console.log(result, "----response from the qeueu -----")
            res.json(result)

            return product
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: error.message })
            throw new Error(error)
        }
    }
} 