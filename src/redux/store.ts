import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './products/productsSlice';
import basketReducer from './basket/basketSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
