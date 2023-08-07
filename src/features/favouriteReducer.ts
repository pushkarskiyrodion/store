import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICatalogProduct } from 'types/CatalogProduct';

const initialFavorite: ICatalogProduct[] = [];

const favourite = createSlice({
  name: 'favourite',
  initialState: initialFavorite,
  reducers: {
    add: (state, action: PayloadAction<ICatalogProduct>) => {
      const productToAdd = action.payload;
      const existingProduct = state.find(product => (
        product.phoneId === productToAdd.phoneId
      ));

      if (!existingProduct) {
        state.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<ICatalogProduct>) => {
      return state.filter(product => (
        product.phoneId !== action.payload.phoneId
      ));
    },
  },
});

export const { actions } = favourite;
export default favourite.reducer;
