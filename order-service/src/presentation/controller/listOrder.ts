import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { orderEntity } from "../../domain/enitities";


export const listOrderController = (dependencies: IDependencies) => {
  const { usecases: { listOrderUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders: orderEntity[] | null = await listOrderUseCase(dependencies).execute()
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