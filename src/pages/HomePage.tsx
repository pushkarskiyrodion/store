import React, { useMemo } from 'react';

import { Container } from 'components/Container/Container';
import { InfiniteSlider } from 'components/InfiniteSlider';
import { ProductsSlider } from 'components/ProductsSlider';
import { ShopByCategory } from 'components/ShopByCategory';

import { banners } from 'data/banners';
import { ICatalogProduct } from 'types/CatalogProduct';
import { IProducts } from 'types/Products';

type Props = {
  products: IProducts
};

export const HomePage: React.FC<Props> = React.memo(({ products }) => {
  const productsHotPrice = useMemo(() => {
    if (!products) {
      return [];
    }

    const hotPrices: ICatalogProduct[] = [];

    Object.values(products).forEach((productArray: ICatalogProduct[]) => {
      const hotProducts = productArray.filter(
        (product) => product.fullPrice - product.price > 80,
      );

      hotPrices.push(...hotProducts);
    });

    return hotPrices.sort((productA, productB) => {
      const discountA = productA.fullPrice - productA.price;
      const discountB = productB.fullPrice - productB.price;

      return discountB - discountA;
    });
  }, [products]);

  const brandNewModels = useMemo(() => {
    if (!products) {
      return [];
    }

    const newModels: ICatalogProduct[] = [];

    Object.values(products).forEach((productArray: ICatalogProduct[]) => {
      const hotProducts = productArray.filter(
        (product) => (
          product.year > 2018
        ),
      );

      newModels.push(...hotProducts);
    });

    return newModels.sort((productA, productB) => (
      productA.price - productB.price
    ));
  }, [products]);

  return (
    <Container>
      <InfiniteSlider images={banners} />
      <ProductsSlider title="Hot prices" products={productsHotPrice} />
      <ShopByCategory products={products} />
      <ProductsSlider title="Brand new models" products={brandNewModels} />
    </Container>
  );
});
