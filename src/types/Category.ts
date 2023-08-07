import { IProducts } from './Products';

export interface ICategory {
  src: string,
  title: string,
  id: number,
  classNameImg: string,
  classNameContainer: string,
  path: string,
  key: keyof IProducts,
}
