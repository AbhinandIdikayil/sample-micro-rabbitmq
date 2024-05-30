import { Router } from "express"
import { controller } from "../../presentation/controller"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const productRoute = (dependencies:IDependencies) => {
    const router = Router()
    const {addProduct} = controller(dependencies)

    
    router.route('/addproduct').post(addProduct)

    return router
}