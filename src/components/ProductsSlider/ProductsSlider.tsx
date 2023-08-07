import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './ProductSlider.scss';

import { CatalogProduct } from 'components/CatalogProduct';
import { Loader } from 'components/Loader';
import { ICatalogProduct } from 'types/CatalogProduct';

type Props = {
  products: ICatalogProduct[] | undefined,
  title: string,
};

const CARD_WIDTH = 272;

export const ProductsSlider: React.FC<Props> = React.memo(({
  title,
  products = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalWidth = CARD_WIDTH * products.length;
  const [position, setPosition] = useState(0);
  const [suitableWidth, setSuitableWidth] = useState<number>(272);

  const widthWithMargins = totalWidth + (products.length * 16);

  useEffect(() => {
    setPosition(0);
  }, [products]);

  const calculateWidth = (): number => {
    if (!containerRef.current) {
      return 0;
    }

    const { clientWidth } = containerRef.current;
    const currentCards = Math.floor(clientWidth / CARD_WIDTH);
    const margin = currentCards * 16;

    setSuitableWidth(widthWithMargins - clientWidth);

    return currentCards * CARD_WIDTH + margin;
  };

  const handleStep = () => {
    if (!containerRef.current) {
      return;
    }

    const { clientWidth } = containerRef.current;
    const isFullFilled = widthWithMargins / position !== 0;
    const passedCards = Math.floor(position / CARD_WIDTH);

    if (position > totalWidth - clientWidth && position) {
      setPosition(widthWithMargins - calculateWidth());

      return;
    }

    if (!isFullFilled && passedCards >= 8) {
      const pos = position - CARD_WIDTH - 16;

      setPosition(pos);
    }
  };

  useEffect(() => {
    if (position > widthWithMargins - CARD_WIDTH || position > suitableWidth) {
      handleStep();
    }

    window.addEventListener('resize', handleStep);

    return () => {
      window.removeEventListener('resize', handleStep);
    };
  }, [position]);

  const handlePrev = () => {
    const step = position - calculateWidth();

    setPosition(step > 0 ? step : 0);
  };

  const handleNext = () => {
    const step = position + calculateWidth();

    setPosition((current) => (
      step > widthWithMargins ? current : step
    ));
  };

  if (!products.length) {
    return (
      <div className="product-slider__loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="product-slider product-slider__main">
      <div className="product-slider__container">
        <h2 className="page__title-main">
          {title}
        </h2>

        <div className="product-slider__button-wrapper">
          <button
            type="button"
            className={classNames(
              'product-slider__button',
              'product-slider__button--prev',
              { 'product-slider__button__disabled': position === 0 },
            )}
            aria-label="none"
            onClick={handlePrev}
            disabled={position === 0}
          />

          <button
            type="button"
            className={classNames('product-slider__button', {
              'product-slider__button--next': position !== suitableWidth,
              'product-slider__button__disabled': position === suitableWidth,
            })}
            aria-label="none"
            onClick={handleNext}
            disabled={position === suitableWidth}
          />
        </div>
      </div>

      <div
        className="product-slider__list"
        ref={containerRef}
      >
        <div
          style={{
            transform: `translateX(${-position}px)`,
          }}
          className="product-slider__list__container"
        >
          {products.map(product => (
            <CatalogProduct key={product.id} catalogProduct={product} />
          ))}
        </div>
      </div>
    </div>
  );
});
