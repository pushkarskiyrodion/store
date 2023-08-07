import { Link } from 'react-router-dom';
import React from 'react';
import './ShopByCategory.scss';

import { categories } from 'data/categories';
import { IProducts } from 'types/Products';
import { Loader } from 'components/Loader';

type Props = {
  products: IProducts | null,
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  if (!products) {
    return <Loader />;
  }

  return (
    <div className="category">
      <h2 className="page__title-main">
        Shop by category
      </h2>

      <div className="category__list">
        {categories.map(({
          classNameContainer,
          classNameImg,
          title,
          path,
          src,
          key,
          id,
        }) => {
          return (
            <Link className="category__link" to={path} key={id}>
              <div className={`category__container__image ${classNameContainer}`}>
                <img
                  className={`category__image ${classNameImg}`}
                  src={src}
                  alt="category"
                />
              </div>

              <h3 className="page__title-subtitle">
                {title}
              </h3>

              <div className="category__models">
                {`${products[key].length} models`}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
