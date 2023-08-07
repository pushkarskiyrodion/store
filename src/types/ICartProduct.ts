import { ICatalogProduct } from './CatalogProduct';

export interface ICartProduct extends ICatalogProduct {
  quantity: number
}
