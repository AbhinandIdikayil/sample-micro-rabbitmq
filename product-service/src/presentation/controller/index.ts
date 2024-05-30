import { IDependencies } from "../../application/interfaces/IDependencies";
import { addProductController } from "./addProduct";


export const controller = (dependencies:IDependencies) => {
    return {
        addProduct:addProductController(dependencies)
    }
}