import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IProduct} from './ProductInterface';

export interface ProductsState {
    products: IProduct[] | [];
    filteredProduct: IProduct[] | [];
    status: 'idle' | 'loading' | 'failed';
    isFilter: boolean;
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
}

const initialState: ProductsState = {
    products: [],
    filteredProduct: [],
    status: 'idle',
    isFilter: false,
};

export const parseProducts = createAsyncThunk('products/fetchProducts',  async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data = await response.json()
    return data.products
});

const filterByCategory = (store: IProduct[], categories: string[]) => {
    let tmpArray:IProduct[] = []
    categories.forEach(category => {
        const filteredArray = store.filter((product) => product.category === category)
        tmpArray = tmpArray.concat(filteredArray)
    })
    return tmpArray
}

const filterByStock = (store: IProduct[], stock: number[]) => {
    return store.filter((product) => product.stock > stock[0] && product.stock < stock[1])
}

const filterByPrice = (store: IProduct[], price: number[]) => {
    return store.filter((product) => product.price > price[0] && product.price < price[1])
}

const filterByBrand = (store: IProduct[], brands: string[]) => {
    let tmpArray: IProduct[] = []
    brands.forEach(brand => {
        const filteredArray = store.filter((product) => product.brand === brand)
        tmpArray = tmpArray.concat(filteredArray)
    })
    return tmpArray
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sort(state, action: PayloadAction<ISort>) {
            if (action.payload.type === 'asc') {
                state.filteredProduct.sort((a, b) => a[action.payload.action] - b[action.payload.action])
            } else if (action.payload.type === 'desc'){
                state.filteredProduct.sort((a, b) => b[action.payload.action] - a[action.payload.action])
            }
        },
        findProduct(state, action: PayloadAction<string>){
            state.filteredProduct = state.products.filter((product) => product.description.toLowerCase().includes(action.payload.toLowerCase()) || product.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
        filterProduct(state, action: PayloadAction<IFilter>){
            state.isFilter = true;
            if (action.payload.categories.length !== 0 && action.payload.brands.length !== 0) {
                state.filteredProduct = filterByBrand(filterByCategory(state.products, action.payload.categories), action.payload.brands)
            } else if (action.payload.categories.length !== 0) {
                state.filteredProduct = filterByCategory(state.products, action.payload.categories)
            } else if (action.payload.brands.length !== 0) {
                state.filteredProduct = filterByBrand(state.products, action.payload.brands)
            } else if (action.payload.price.length !== 0) {
                state.filteredProduct = filterByPrice(state.products, action.payload.price)
            } else if (action.payload.stock.length !== 0) {
                state.filteredProduct = filterByStock(state.products, action.payload.stock)
            }else {
                state.filteredProduct = state.products
                state.isFilter = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(parseProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(parseProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
                state.filteredProduct = action.payload
            })
            .addCase(parseProducts.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {sort, findProduct, filterProduct} = productsSlice.actions;

export const getProductsState = (state: RootState): ProductsState => state.products;

export default productsSlice.reducer;
