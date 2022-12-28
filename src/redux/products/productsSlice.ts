import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {IProduct} from './ProductInterface';

import {RootState} from '../store';

export interface ProductsState {
    products: IProduct[] | [];
    filteredProduct: IProduct[] | [];
    status: 'idle' | 'loading' | 'failed';
    isFilter: boolean;
    initMaxPrice: number;
    initMaxStock: number;
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
}

interface ISort {
    type: string;
    action: 'price' | 'rating' | 'discountPercentage';
}

interface IFilter {
    categories: string[];
    brands: string[];
    price: number[];
    stock: number[];
    search: string
}

const initialState: ProductsState = {
    products: [],
    filteredProduct: [],
    status: 'idle',
    isFilter: false,
    initMaxPrice: 0,
    initMaxStock: 0,
    minPrice: 0,
    maxPrice: 0,
    minStock: 0,
    maxStock: 0,
};

export const parseProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    return data.products;
});

const filterByCategory = (store: IProduct[], categories: string[]) => {
    let tmpArray: IProduct[] = [];
    categories.forEach((category) => {
        const filteredArray = store.filter((product) => product.category === category);
        tmpArray = tmpArray.concat(filteredArray);
    });
    return categories.length !== 0 ? tmpArray : store;
};

const filterByStock = (store: IProduct[], stock: number[]) => {
    return stock.length !== 0
        ? store.filter((product) => product.stock > stock[0] && product.stock < stock[1])
        : store;
};

const filterByPrice = (store: IProduct[], price: number[]) => {
    return price.length !== 0
        ? store.filter((product) => product.price > price[0] && product.price < price[1])
        : store;
};

const filterByBrand = (store: IProduct[], brands: string[]) => {
    let tmpArray: IProduct[] = [];
    brands.forEach((brand) => {
        const filteredArray = store.filter((product) => product.brand === brand);
        tmpArray = tmpArray.concat(filteredArray);
    });
    return brands.length !== 0 ? tmpArray : store;
};

const findMinMax = (store: IProduct[]) => {
    let tmp = store.map((el) => el.price);
    const minPrice = Math.min(...tmp);
    const maxPrice = Math.max(...tmp);
    tmp = store.map((el) => el.stock);
    const minStock = Math.min(...tmp);
    const maxStock = Math.max(...tmp);
    return {minPrice, maxPrice, minStock, maxStock};
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sort(state, action: PayloadAction<ISort>) {
            if (action.payload.type === 'asc') {
                state.products.sort((a, b) => a[action.payload.action] - b[action.payload.action]);
                state.filteredProduct.sort((a, b) => a[action.payload.action] - b[action.payload.action]);
            } else if (action.payload.type === 'desc') {
                 state.products.sort((a, b) => b[action.payload.action] - a[action.payload.action]);
                 state.filteredProduct.sort((a, b) => b[action.payload.action] - a[action.payload.action]);
            }
        },
        filterProduct(state, action: PayloadAction<IFilter>) {
            console.log(action.payload)
            state.isFilter = true;
            if (
                action.payload.categories.length !== 0 ||
                action.payload.brands.length !== 0 ||
                action.payload.price.length !== 0 ||
                action.payload.stock.length !== 0 ||
                action.payload.search.length !==0
            ) {
                state.filteredProduct = filterByStock(
                    filterByPrice(
                        filterByBrand(
                            filterByCategory(state.products, action.payload.categories),
                            action.payload.brands,
                        ),
                        action.payload.price,
                    ),
                    action.payload.stock,
                ).filter(
                    (product) =>
                        product.description.toLowerCase().includes(action.payload.search.toLowerCase()) ||
                        product.title.toLowerCase().includes(action.payload.search.toLowerCase()),
                );
            } else {
                state.filteredProduct = state.products;
                state.isFilter = false;
            }
            let minMax = findMinMax(state.products);
            if (state.isFilter) {
                minMax = findMinMax(state.filteredProduct);
            }
            state.minPrice = minMax.minPrice;
            state.maxPrice = minMax.maxPrice;
            state.minStock = minMax.minStock;
            state.maxStock = minMax.maxStock;
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
                state.filteredProduct = action.payload;
                const minMax = findMinMax(state.filteredProduct);
                state.minPrice = minMax.minPrice;
                state.maxPrice = state.initMaxPrice = minMax.maxPrice;
                state.minStock = minMax.minStock;
                state.maxStock = state.initMaxStock = minMax.maxStock;
            })
            .addCase(parseProducts.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {sort, filterProduct} = productsSlice.actions;

export const getProductsState = (state: RootState): ProductsState => state.products;

export default productsSlice.reducer;
