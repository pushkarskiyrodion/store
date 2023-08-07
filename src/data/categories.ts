import { ICategory } from 'types/Category';

export const categories: ICategory[] = [
  {
    id: 1,
    src: './img/category-phones.png',
    title: 'Phones',
    classNameImg: 'category__image--phones',
    classNameContainer: 'category__container--phones',
    path: 'phones',
    key: 'phones',
  },
  {
    id: 2,
    src: './img/category-tablets.png',
    title: 'Tablets',
    classNameImg: 'category__image--tablets',
    classNameContainer: 'category__container--tablets',
    path: 'tablets',
    key: 'tablets',
  },
  {
    id: 3,
    src: './img/category-accessories.png',
    title: 'Accessories',
    classNameImg: 'category__image--accessories',
    classNameContainer: 'category__container--accessories',
    path: 'accessories',
    key: 'accessories',
  },
];
