/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyAction,
  Dispatch,
  Middleware,
  configureStore,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import authReducer from 'features/authReducer';
import cartReducer from 'features/cartReducer';
import favouriteReducer from 'features/favouriteReducer';
import productsReducer from 'features/productsReducer';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  favourite: JSON.parse(localStorage.getItem('favourite') || '[]'),
};

export const localStorageMiddleware: Middleware<{}, any, Dispatch<AnyAction>>
= (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => (
  next: Dispatch<AnyAction>,
) => (action: AnyAction) => {
  const result = next(action);
  const state = store.getState();

  if (action.type.includes('cart')) {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }

  if (action.type.includes('favourite')) {
    localStorage.setItem('favourite', JSON.stringify(state.favourite));
  }

  return result;
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    auth: authReducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(localStorageMiddleware)
  ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
