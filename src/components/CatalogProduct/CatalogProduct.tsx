import { Link } from 'react-router-dom';
import { useRef } from 'react';
import './CatalogProduct.scss';

import { AddItem } from 'components/AddItem';
import { ICatalogProduct } from 'types/CatalogProduct';

type Props = {
  catalogProduct: ICatalogProduct
};

export const CatalogProduct: React.FC<Props> = ({ catalogProduct }) => {
  const productRef = useRef<HTMLAnchorElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, target } = e;

    if (!productRef.current || !buttonsRef.current) {
      return;
    }

    if (
      currentTarget.contains(productRef.current) &&
      !buttonsRef.current?.contains(target as Node)
    ) {
      productRef.current.click();
    }
  }

  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = catalogProduct;

  return (
    <div onClick={handleClick} className="catalog-product">
      <Link
        ref={productRef}
        className="catalog-product__link"
        to={`/${category}/${itemId}`}
      >
        <div className="catalog-product__image">
          <img src={image} alt="phone" />
        </div>

        <h3 className="catalog-product__title">
          {name}
        </h3>

        <div className="catalog-product__price-wrapper">
          <span className="page__title-section">{`$${price}`}</span>
          <span className="page__full-price">{`$${fullPrice}`}</span>
        </div>

        <div className="page__tech-specs">
          <div className="page__tech-specs__item">
            <span className="page__tech-specs__title">
              Screen
            </span>

            <span className="page__tech-specs__info">
              {screen}
            </span>
          </div>

          <div className="page__tech-specs__item">
            <span className="page__tech-specs__title">
              Capacity
            </span>

            <span className="page__tech-specs__info">
              {capacity}
            </span>
          </div>

          <div className="page__tech-specs__item">
            <span className="page__tech-specs__title">
              RAM
            </span>

            <span className="page__tech-specs__info">
              {ram}
            </span>
          </div>
        </div>
      </Link>

      <div ref={buttonsRef}>
        <AddItem product={catalogProduct} />
      </div>
    </div>
  );
};
