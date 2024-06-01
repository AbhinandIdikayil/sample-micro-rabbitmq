import { IDependencies } from "../../application/interfaces/IDependencies"
import { listOrderController } from "./listOrder"

export const controller = (dependencies:IDependencies) => {
    return {
        listOrder:listOrderController(dependencies),
    }
}