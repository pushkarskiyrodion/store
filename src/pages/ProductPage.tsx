import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { NoSearchResults } from 'components/ErrorPages/NoSearchResults';
import { NoResults } from 'components/ErrorPages/NoResults';
import { CatalogProduct } from 'components/CatalogProduct';
import { Container } from 'components/Container/Container';
import { UserLocation } from 'components/UserLocation';
import { ScrollToTop } from 'components/ScrollToTop';
import { Pagination } from 'components/Pagination';
import { Dropdown } from 'components/Dropdown';
import { Loader } from 'components/Loader';

import { Pagination as EnumPagination } from 'enums/Pagination';
import { Sort } from 'enums/Sort';
import { getSearchWith } from 'helpers/getSearchWith';
import { wait } from 'helpers/wait';
import { ICatalogProduct } from 'types/CatalogProduct';
import { QueryParams } from 'types/QueryParams';

type Props = {
  productsCategory: ICatalogProduct[],
  title: string,
};

export const ProductPage: React.FC<Props> = ({ productsCategory, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPaginationChanged, setIsPaginationChanged] = useState(false);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = searchParams.get('perPage') || '';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const perPageNum = parseInt(perPage, 10) || productsCategory.length;
  const [pages, setPages] = useState(Math.ceil(productsCategory.length / perPageNum))

  const setSearchWith = (params: QueryParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  useEffect(() => {
    setSearchWith({
      perPage: EnumPagination.Sixteen,
      sort: Sort.Newest,
      query: null,
      page: 1,
    });
  }, [productsCategory]);

  const handleSelectSort = (item: string) => {
    setSearchWith({ sort: item });
  };

  const handleSelectItemOnPage = (item: string) => {
    setSearchWith({
      perPage: item,
      page: item === EnumPagination.all ? null : '1',
    });
  };

  const handleSelectPage = (item: number) => {
    if (item !== page) {
      setIsPaginationChanged(true);

      window.scrollTo({
        top: 0,
      });

      wait(500)
        .then(() => setIsPaginationChanged(false));
    }

    setSearchWith({ page: item });
  };

  const sortedProducts = useMemo(() => {
    let productsCopy = [...productsCategory];
    const startIndex = (page - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;

    productsCopy.sort((productA, productB) => {
      switch (sort) {
        case Sort.Alphabetically:
          return productA.name.localeCompare(productB.name);

        case Sort.Cheapest:
          return productA.price - productB.price;

        case Sort.Newest:
          return productB.year - productA.year;

        default:
          return 0;
      }
    });

    if (query) {
      productsCopy = productsCopy.filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    setPages(Math.ceil(productsCopy.length / perPageNum) || 1)

    return productsCopy.slice(startIndex, endIndex);
  }, [productsCategory, sort, perPage, page, query]);

  if (!productsCategory.length) {
    return <NoResults />;
  }

  if (isPaginationChanged) {
    return <Loader />;
  }

  const sortValue = sort ? sort[0].toUpperCase() + sort.slice(1) : Sort.Newest;
  const perPageValue = perPage ? perPage : EnumPagination.Sixteen;

  return (
    <Container>
      <ScrollToTop />
      <section className="page__products">
        <UserLocation />

        <h2 className="page__title-main page__products__title">
          {title}
        </h2>

        <div className="page__products__quantities">
          {`${productsCategory.length} models`}
        </div>

        <div className="page__products__params">
          <div className="dropdown__sort">
            <Dropdown
              dropdownList={Sort}
              title="Sort by"
              onSelectHandler={handleSelectSort}
              initialValue={sortValue}
            />
          </div>

          <div className="dropdown__per-page">
            <Dropdown
              dropdownList={EnumPagination}
              title="Items on page"
              onSelectHandler={handleSelectItemOnPage}
              initialValue={perPageValue}
            />
          </div>
        </div>

        {query && !sortedProducts.length
          ? <NoSearchResults />
          : (
            <div className="page__products__container">
              {sortedProducts.map(product => (
                <CatalogProduct catalogProduct={product} key={product.id} />
              ))}
            </div>
          )}

        <Pagination
          pages={pages}
          selectedPage={page}
          onSelectPage={handleSelectPage}
        />
      </section>
    </Container>
  );
};
