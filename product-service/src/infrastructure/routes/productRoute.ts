import { Router } from "express"
import { controller } from "../../presentation/controller"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { verifyToken } from "../../utils/verifyToken"

export const productRoute = (dependencies:IDependencies) => {
    const router = Router()
    const {addProduct , buyProduct} = controller(dependencies)

    
    router.post('/addproduct', addProduct)

    router.post('/buyproduct',verifyToken , buyProduct)

    // router.route('/addproduct').post()

    return router
}