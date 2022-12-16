import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {IProduct} from './ProductInterface';

export interface ProductsState {
  products: IProduct[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

export const parseProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await fetch('https://dummyjson.com/products?limit=100')
      .then(async response => await response.json())
      .then(response => response.products)
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    parseAllProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(parseProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(parseProducts.fulfilled, (state, action ) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(parseProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { parseAllProducts } = productsSlice.actions;

export const getProducts = (state: RootState): IProduct[] | [] => state.products.products;

export default productsSlice.reducer;
