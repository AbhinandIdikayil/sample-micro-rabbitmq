import { IDependencies } from "../application/interfaces/IDependencies";
import * as repositories from '../infrastructure/database/mongodb/repositories'
import * as usecases from '../application/usecases/index'

export const dependencies:IDependencies = {
    repositories,
    usecases
}