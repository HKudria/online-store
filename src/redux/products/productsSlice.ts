import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IProduct} from './ProductInterface';

export interface ProductsState {
    products: IProduct[] | [];
    status: 'idle' | 'loading' | 'failed';
}

interface ISort {
    type: string
    action: 'price' | 'rating' | 'discountPercentage'
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
        sort(state, action: PayloadAction<ISort>) {
            if (action.payload.type === 'a') {
                state.products.sort((a, b) => a[action.payload.action] - b[action.payload.action])
            } else {
                state.products.sort((a, b) => b[action.payload.action] - a[action.payload.action])
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(parseProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(parseProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(parseProducts.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {sort} = productsSlice.actions;

export const getProductsState = (state: RootState): ProductsState => state.products;

export default productsSlice.reducer;
