import { Router } from "express"
import { controller } from "../../presentation/controller"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const userRoute = (dependencies:IDependencies) => {
    const router = Router()
    const {signup , login} = controller(dependencies)


    router.route('/signup').post(signup)

    router.route('/login').post(login)

    return router
}