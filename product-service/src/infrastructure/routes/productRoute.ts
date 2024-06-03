import { Router } from "express"
import { controller } from "../../presentation/controller"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { verifyToken } from "../../utils/verifyToken"

export const productRoute = (dependencies:IDependencies) => {
    const router = Router()
    const {addProduct , buyProduct} = controller(dependencies)

    
    router.post('/add', addProduct)

    router.post('/buy',verifyToken , buyProduct)

    // router.route('/addproduct').post()

    return router
}