import { productEntity } from "../entities";


export interface IAddProductUseCase {
    execute(data:productEntity):Promise<productEntity | null>;
}