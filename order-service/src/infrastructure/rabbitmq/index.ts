
import amqp from 'amqplib'
import { orderModel } from '../database/mongodb/model/orderModel';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export const rabbitmqController = () => {
    try {

        const connectToRabbitMQ = async (retryCount = 0): Promise<amqp.Channel | null> => {
            try {
                const connection: amqp.Connection = await amqp.connect(
                    'amqp://localhost:5672'
                );
                const channel: amqp.Channel = await connection.createChannel();
                await channel.assertQueue("ORDER");
                console.log('rabbit mq connected')
                return channel;
            } catch (error: unknown) {
                if (retryCount < MAX_RETRIES - 1) {
                    console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    return connectToRabbitMQ(retryCount + 1);
                } else {
                    console.log(error)
                    console.log('Max retries reached. Failed to connect to RabbitMQ.');
                    return null;
                }
            }
        };

        interface Item {
            price: number
        }



        function calculateSum(arr: Array<Item>): number {
            let total = arr.reduce((sum, item) => sum + item.price, 0)
            return total
        }




        const useMQ = async () => {
            try {
                const channel: amqp.Channel | null = await connectToRabbitMQ()
                if (channel) {
                    channel.consume('ORDER',
                        async (msg: amqp.ConsumeMessage | null) => {
                            if (msg != null) {
                                const message = JSON.parse(msg.content.toString())
                                console.log(message, '---- message from queue ---')
                                try {
                                    if (message) {
                                        let isOrder = await orderModel.findOne({ userId: message.userId })
                                        if (isOrder) {

                                            let order = await orderModel.findOneAndUpdate(
                                                { userId: message.userId },
                                                {
                                                    $push: {
                                                        'orders': {
                                                            productId: message.details.id,
                                                            name: message.details.name,
                                                            desc: message.details.desc,
                                                            price: message.details.price
                                                        }
                                                    },
                                                    $inc: { totalPrice: message.details.price }
                                                },
                                                {
                                                    new: true
                                                }
                                            )
                                            if (order) {
                                                console.log(order, '----- from order if condition -----')
                                                channel.sendToQueue('BUYED-PRODUCT', Buffer.from(JSON.stringify(order)));
                                            }
                                        } else {
                                            // let totalPrice = calculateSum(message.details)
                                            const order = await orderModel.create({
                                                orders: [
                                                    {
                                                        productId: message.details.id,
                                                        name: message.details.name,
                                                        desc: message.details.desc,
                                                        price: message.details.price
                                                    }
                                                ],
                                                totalPrice: parseInt(message.details.price),
                                                userId: message.userId
                                            })
                                            channel.sendToQueue('BUYED-PRODUCT', Buffer.from(JSON.stringify(order)))
                                        }
                                    }
                                    channel.ack(msg);
                                } catch (error) {
                                    console.log(error)
                                    channel?.nack(msg)
                                }

                            }
                        },
                        {
                            noAck: false
                        }
                    )
                } else {
                    console.log('out')
                }
            } catch (error: any) {
                console.log(error)
            }

        }

        useMQ()

    } catch (error: any) {
        console.log(error.message);
    }
}