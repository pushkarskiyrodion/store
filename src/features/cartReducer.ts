import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICatalogProduct } from 'types/CatalogProduct';
import { ICartProduct } from 'types/ICartProduct';

const initialCart: ICartProduct[] = [];

const cartReducer = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    add: (state, action: PayloadAction<ICatalogProduct>) => {
      const productToAdd = action.payload;
      const existingProduct = state.find(product => (
        product.phoneId === productToAdd.phoneId
      ));

      if (!existingProduct) {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action: PayloadAction<ICatalogProduct>) => {
      return state.filter(product => (
        product.phoneId !== action.payload.phoneId
      ));
    },
    addQuantity: (state, action: PayloadAction<ICartProduct>) => (
      state.map(item => {
        const existingProduct = state.find(product => (
          product.phoneId === action.payload.phoneId
        ));

        if (item.phoneId === existingProduct?.phoneId) {
          return { ...existingProduct, quantity: action.payload.quantity + 1 };
        }

        return item;
      })
    ),
    removeQuantity: (state, action: PayloadAction<ICartProduct>) => (
      state.map(item => {
        const existingProduct = state.find(product => (
          product.phoneId === action.payload.phoneId
        ));

        if (item.phoneId === existingProduct?.phoneId) {
          return { ...existingProduct, quantity: action.payload.quantity - 1 };
        }

        return item;
      })
    ),
  },
});

export const { actions } = cartReducer;
export default cartReducer.reducer;
