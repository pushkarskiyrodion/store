import { ICatalogProduct } from './CatalogProduct';

export interface IProducts {
  phones: ICatalogProduct[],
  tablets: ICatalogProduct[],
  accessories: ICatalogProduct[],
}
