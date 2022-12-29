import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
