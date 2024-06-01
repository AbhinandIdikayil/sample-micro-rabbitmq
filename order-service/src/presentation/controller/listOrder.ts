import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { orderEntity } from "../../domain/enitities";


interface authenticatedRequest extends Request {
  user?:any
}

export const listOrderController = (dependencies: IDependencies) => {
  const { usecases: { listOrderUseCase } } = dependencies
  return async (req: authenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {id} = req.user
      const orders: orderEntity[] | null = await listOrderUseCase(dependencies).execute(id)
      if (orders !== null) {
        if (orders.length > 0) {
          res.status(200).json(orders)
        } else {
          res.status(200).json('empty')
        }
      } else {
        res.status(400).json({ 'message': 'null' })
      }
    } catch (error) {
      console.log(error)
    }
  }
}