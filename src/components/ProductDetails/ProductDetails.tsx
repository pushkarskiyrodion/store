import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetails.scss';

import { ProductsSlider } from 'components/ProductsSlider';
import { BackButton } from 'components/Buttons/BackButton';
import { NotFound } from 'components/ErrorPages/NotFound';
import { UserLocation } from 'components/UserLocation';
import { AddItem } from 'components/AddItem';
import { Loader } from 'components/Loader';

import { getProductsDetails, getSameModels } from 'api/productDetaits';
import { ICatalogProduct } from 'types/CatalogProduct';
import { IProductDetails } from 'types/ProductDetails';
import { setColor } from 'helpers/setColor';

type Props = {
  productsCategory: ICatalogProduct[],
};

export const ProductDetails: React.FC<Props> = ({ productsCategory }) => {
  const [product, setProduct] = useState<IProductDetails | null>(null);
  const [sameModels, setSameModels] = useState<IProductDetails[] | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { productId = '' } = useParams();

  useEffect(() => {
    setCurrentPhoto(0);

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const details: IProductDetails = await getProductsDetails(
          productId,
          300,
        );

        setProduct(details);

        const products = await getSameModels(
          productId,
          details.colorsAvailable,
          details.capacityAvailable,
        );

        setSameModels(products);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const isNewProduct = sameModels?.some(model => (
      model.id === productId
    ));

    if (!isNewProduct) {
      fetchData();

      window.scrollTo(0, 0);
    }
  }, [productId]);

  const handleSelectPhoto = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    setCurrentPhoto(index);
  };

  const handleSelectProduct = (sameModel: IProductDetails) => {
    setCurrentPhoto(0);
    setProduct(sameModel);
  };

  if (!product || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  const {
    id,
    ram,
    name,
    zoom,
    cell,
    screen,
    camera,
    images,
    processor,
    resolution,
    description,
    priceRegular,
    priceDiscount,
    color: productColor,
    capacity: productCapacity,
  } = product;

  const currentProduct = productsCategory.find(({ phoneId }) => (
    phoneId === productId
  )) || null;

  const suggestedProducts = productsCategory.filter(products => {
    const isIncluded = sameModels?.some(model => (
      model.id.includes(products.phoneId)
    ));

    if (isIncluded) {
      return false;
    }

    return (
      products.ram === ram
      || products.capacity === productCapacity
      || products.screen === screen
      || products.fullPrice >= priceRegular - 100
    );
  });

  return (
    <section className="product-details">
      <UserLocation productName={name} />

      <BackButton />

      <h3 className="page__title-main">{name}</h3>

      <div className="product-details__main">
        <div className="product-details__header">
          <div className="product-details__image__container">
            <div className="product-details__thumbnails">
              {images.map((image, index) => (
                <a
                  href="/"
                  className={cn(
                    'product-details__thumb__item', {
                      'product-details__thumb--active': index === currentPhoto,
                    },
                  )}
                  key={image}
                  onClick={(e) => handleSelectPhoto(e, index)}
                >
                  <img src={image} alt="thumb" />
                </a>
              ))}
            </div>

            <div className="product-details__image__main">
              <img src={images[currentPhoto]} alt="" />
            </div>
          </div>

          <div className="product-details__data">
            <div className="product-details__container__colors">
              <div className="product-details__title-product">
                Available colors
              </div>

              <div className="product-details__colors">
                {sameModels?.map(sameModel => {
                  const { color, id: modelId, capacity } = sameModel;

                  if (capacity !== productCapacity) {
                    return;
                  }

                  return (
                    <NavLink
                      className={({ isActive }) => cn(
                        'product-details__link-color',
                        { 'product-details__link-color--active': isActive },
                      )}
                      to={`../${modelId}`}
                      onClick={() => handleSelectProduct(sameModel)}
                      key={modelId}
                    >
                      <div
                        className="product-details__color"
                        style={{
                          backgroundColor: setColor(color),
                          opacity: 0.8,
                        }}
                      />
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="product-details__capacity">
              <div className="product-details__title-product">
                Select capacity
              </div>

              <div className="product-details__capacity__available">
                {sameModels?.map(sameModel => {
                  const { color, id: modelId, capacity } = sameModel;

                  if (color !== productColor) {
                    return;
                  }

                  return (
                    <NavLink
                      key={modelId}
                      to={`../${modelId}`}
                      onClick={() => handleSelectProduct(sameModel)}
                      className={cn('product-details__capacity__item', {
                        'product-details__capacity--active':
                        capacity === productCapacity,
                      })}
                    >
                      {capacity}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="product-details__price">
              <span className="page__title-section">{`$${priceDiscount}`}</span>
              <span className="page__full-price">{`$${priceRegular}`}</span>
            </div>

            <AddItem product={currentProduct} />

            <div className="page__tech-specs product-details__container__tech">
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
                  Resolution
                </span>

                <span className="page__tech-specs__info">
                  {resolution}
                </span>
              </div>

              <div className="page__tech-specs__item">
                <span className="page__tech-specs__title">
                  Processor
                </span>

                <span className="page__tech-specs__info">
                  {processor}
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
          </div>

          <p className="product-details__id">
            {`ID: ${id}`}
          </p>
        </div>

        <div className="product-details__info">
          <div className="product-details__info__container">
            <h4 className="page__title-section product-details__info__title">
              About
            </h4>

            <div className="product-details__info__about">
              {description.map(({ text, title }) => (
                <div key={title}>
                  <h5 className="page__title-subtitle">{title}</h5>
                  <p className="page__text">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="product-details__info__container">
            <h4 className="page__title-section product-details__info__title">
              Tech Specs
            </h4>

            <div className="product-details__tech-specs">
              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Screen
                </span>

                <span className="product-details__tech-specs__text">
                  {screen}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Resolution
                </span>

                <span className="product-details__tech-specs__text">
                  {resolution}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Processor
                </span>

                <span className="product-details__tech-specs__text">
                  {processor}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  RAM
                </span>

                <span className="product-details__tech-specs__text">
                  {ram}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Built in memory
                </span>

                <span className="product-details__tech-specs__text">
                  {productCapacity}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Camera
                </span>

                <span className="product-details__tech-specs__text">
                  {camera}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Zoom
                </span>

                <span className="product-details__tech-specs__text">
                  {zoom}
                </span>
              </div>

              <div className="product-details__tech-specs__container">
                <span className="product-details__tech-specs__title">
                  Cell
                </span>

                <div>
                  {cell.map(c => (
                    <span key={c} className="product-details__tech-specs__text">
                      {`${c}, `}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductsSlider
          products={suggestedProducts}
          title="You may also like"
        />
      </div>
    </section>
  );
};
