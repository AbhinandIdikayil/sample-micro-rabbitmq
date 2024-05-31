import { IDependencies } from "../../application/interfaces/IDependencies"
import { listOrderController } from "./listOrder"
import { rabbitmqController } from "./rabbitmq"

export const controller = (dependencies:IDependencies) => {
    return {
        listOrder:listOrderController(dependencies),
    }
}