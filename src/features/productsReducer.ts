/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICatalogProduct } from 'types/CatalogProduct';
import { IProducts } from 'types/Products';

const initialProducts: IProducts = {
  phones: [],
  tablets: [],
  accessories: [],
};

interface IAddPayload {
  [key: string]: ICatalogProduct[];
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProducts,
  reducers: {
    set: (state, action: PayloadAction<IAddPayload>) => {
      Object.keys(action.payload).forEach(category => {
        state[category as keyof IProducts] = action.payload[category];
      });
    },
  },
});

export default productsSlice.reducer;
export const { actions } = productsSlice;
