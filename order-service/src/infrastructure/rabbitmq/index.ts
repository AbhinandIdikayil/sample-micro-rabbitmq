
import amqp from 'amqplib'
import { orderModel } from '../database/mongodb/model/orderModel';
import { Connection, Channel } from 'amqplib'
export const rabbitmqController = () => {
    try {

        const connectToRabbitMQ = async (): Promise<{ channel: Channel; connection: Connection } | undefined> => {
            try { 
                const connection: Connection = await amqp.connect(
                    'amqp://localhost:5672'
                );
                const channel: Channel = await connection.createChannel();
                await channel.assertQueue("ORDER");
                return { channel, connection };
            } catch (error: unknown) {
                console.log("Error connecting to RabbitMQ:", error);
                return undefined
            }
        };

        interface Item {
            price: number
        }


        const sendToBuyedProductQueue = async (channel: amqp.Channel, order: any) => {
            try {
                const orderBuffer = Buffer.from(JSON.stringify(order));
                channel.sendToQueue('BUYED-PRODUCT', orderBuffer);
                console.log('--- Data sent to BUYED-PRODUCT queue ---');
            } catch (error) {
                console.error("Error sending message to BUYED-PRODUCT queue:", error);
                throw error;
            }
        }



        const handleOrderMessage = async (channel: amqp.Channel, msg: any) => {
            try {
                const message = JSON.parse(msg.content.toString());
                console.log(message, '---- message from ORDER queue ----');

                // Process the order message
                let order;
                let isOrder = await orderModel.findOne({ userId: message.userId });
                if (isOrder) {
                    let price = Number(isOrder?.totalPrice);
                    console.log(price, '---- total price key ----');
                    order = await orderModel.findOneAndUpdate(
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
                        { new: true }
                    );
                } else {
                    // Calculate total price if needed
                    order = await orderModel.create({
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
                    });
                }

                // Send response to 'BUYED-PRODUCT' queue if order is created or updated
                if (order) {
                    console.log(order, '----- processed order -----');
                    await sendToBuyedProductQueue(channel, order);
                }
                channel.ack(msg);
            } catch (error) {
                console.error("Error handling order message:", error);
                // Optionally reject the message or retry
                channel.nack(msg, false, false);
            }
        };


        async function closeChannel(channel: amqp.Channel | any, connection: amqp.Connection | any) {
            try {
                console.log("Closing RabbitMQ channel...");
                await channel.close();
                console.log("RabbitMQ channel closed.");
            } catch (error) {
                console.error("Error closing RabbitMQ channel:", error);
            }
            try {
                console.log("Closing RabbitMQ connection...");
                await connection.close();
                console.log("RabbitMQ connection closed.");
            } catch (error) {
                console.error("Error closing RabbitMQ connection:", error);
            }
        }



        const useMQ = async () => {
            try {
                // channel: amqp.Channel | undefined
                const rabbitMQConnection = await connectToRabbitMQ()
                if (!rabbitMQConnection) {
                    console.log('Failed to connect to RabbitMQ.');
                    return
                }
                const { channel, connection } = rabbitMQConnection
                if (channel && connection) {
                    channel.consume('ORDER',
                        async (msg: amqp.ConsumeMessage | null) => {
                            await handleOrderMessage(channel, msg)
                        },
                        {
                            noAck: false
                        }
                    )
                    // Graceful shutdown handling
                    process.on('SIGINT', async () => {
                        console.log('Received SIGINT, shutting down...');
                        await closeChannel(channel, connection);
                        process.exit(0);
                    }); 

                    process.on('SIGTERM', async () => {
                        console.log('Received SIGTERM, shutting down...');
                        await closeChannel(channel, connection);
                        process.exit(0);
                    });
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