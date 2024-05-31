import { IDependencies } from "../../application/interfaces/IDependencies";
import { addProductController } from "./addProduct";
import { buyProductController } from "./buyProduct";


export const controller = (dependencies:IDependencies) => {
    return {
        addProduct:addProductController(dependencies),
        buyProduct:buyProductController(dependencies)
    }
}