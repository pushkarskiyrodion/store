import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';

import { actions as productsActions } from 'features/productsReducer';
import { ProductDetails } from 'components/ProductDetails';
import { NotFound } from 'components/ErrorPages/NotFound';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Loader } from 'components/Loader';

import { FavouritePage } from 'pages/FavouritePage';
import { PageNotFound } from 'pages/PageNotFound';
import { ProductPage } from 'pages/ProductPage';
import { CartPage } from 'pages/CartPage';
import { HomePage } from 'pages/HomePage';

import { getProducts } from 'api/product';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const products = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const phones = await getProducts();

        dispatch(productsActions.set({
          phones,
          accessories: [],
          tablets: [],
        }));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          )}
        >
          <Route index element={<HomePage products={products} />} />

          <Route path="phones">
            <Route
              index
              element={(
                <ProductPage
                  productsCategory={products.phones}
                  title="Mobile phones"
                />
              )}
            />
            <Route
              path=":productId"
              element={<ProductDetails productsCategory={products.phones} />}
            />
          </Route>

          <Route path="tablets">
            <Route
              index
              element={(
                <ProductPage
                  productsCategory={products.tablets}
                  title="Tablets"
                />
              )}
            />
            <Route
              path=":productId"
              element={<ProductDetails productsCategory={products.tablets} />}
            />
          </Route>

          <Route path="accessories">
            <Route
              index
              element={(
                <ProductPage
                  productsCategory={products.accessories}
                  title="Accessories"
                />
              )}
            />
            <Route
              path=":productId"
              element={(
                <ProductDetails productsCategory={products.accessories} />
              )}
            />
          </Route>

          <Route path="favourite" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
