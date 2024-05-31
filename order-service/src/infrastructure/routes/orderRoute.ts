import { Router } from "express"
import { controller } from "../../presentation/controller"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const orderRoute = (dependencies:IDependencies) => {
    const router = Router()
    const {listOrder } = controller(dependencies)

    router.route('/list-order').get(listOrder)

    return router
}