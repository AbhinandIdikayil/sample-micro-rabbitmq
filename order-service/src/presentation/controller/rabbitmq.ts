
import amqp from 'amqplib'
import { orderModel } from '../../infrastructure/database/mongodb/model/orderModel';

export const rabbitmqController =  () => {
    try {

        const connectToRabbitMQ = async () => {
            try {
                const connection: amqp.Connection = await amqp.connect(
                    process.env.RABBIT_MQ!
                );
                const channel: amqp.Channel = await connection.createChannel();
                await channel.assertQueue("ORDER", { durable: false });
                return channel;
            } catch (error: unknown) {
                console.error("Error connecting to RabbitMQ:", error);
            }
        };


        const useMQ = async () => {
            try {
                const channel:amqp.Channel | undefined = await  connectToRabbitMQ()
                if(channel) {
                    await channel.consume('ORDER' , 
                        async (msg:amqp.ConsumeMessage | null) => {
                            if(msg != null) {
                                const message =JSON.parse(msg.content.toString())
                                if(message){
                                    const order = await orderModel.create(message)
                                    channel.sendToQueue('BUYED-PRODUCT',Buffer.from(JSON.stringify(order)))
                                }
                                channel.ack(msg);
                            }
                        }
                    )
                } else {
                    console.log('out')
                } 
            } catch (error:any) {
                console.log(error)
            }
            
        }

        useMQ()

    } catch (error) {
        console.log(error);
    }
}