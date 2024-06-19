
import amqp from 'amqplib'
import { orderModel } from '../database/mongodb/model/orderModel';

export const rabbitmqController = () => {
    try {

        const connectToRabbitMQ = async () => {
            try {
                const connection: amqp.Connection = await amqp.connect(
                    'amqp://localhost:5672'
                );
                const channel: amqp.Channel = await connection.createChannel();
                await channel.assertQueue("ORDER");
                return channel;
            } catch (error: unknown) {
                console.error("Error connecting to RabbitMQ:", error);
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
                const channel: amqp.Channel | undefined = await connectToRabbitMQ()
                if (channel) {
                    channel.consume('ORDER',
                        async (msg: amqp.ConsumeMessage | null) => {
                            if (msg != null) {
                                const message = JSON.parse(msg.content.toString())
                                console.log(message, '---- message from queue ---')
                                if (message) {
                                    let isOrder = await orderModel.findOne({ userId: message.userId })
                                    if (isOrder) {
                                        let price = Number(isOrder?.totalPrice);
                                        console.log(price, '---- total price key ---');
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
                                                $inc: { totalPrice: price }
                                            },
                                            {
                                                new: true
                                            }
                                        )
                                        if (order) {
                                            console.log(order, '----- from order if condition -----')
                                            channel.sendToQueue('BUYED-PRODUCT', Buffer.from(JSON.stringify(order)));
                                            return
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

    } catch (error) {
        console.log(error);
    }
}