import { Link } from 'react-router-dom';
import './CatalogProduct.scss';

import { AddItem } from 'components/AddItem';
import { ICatalogProduct } from 'types/CatalogProduct';

type Props = {
  catalogProduct: ICatalogProduct
};

export const CatalogProduct: React.FC<Props> = ({ catalogProduct }) => {
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
    <div className="catalog-product">
      <Link to={`/${category}/${itemId}`}>
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

      <AddItem product={catalogProduct} />
    </div>
  );
};
