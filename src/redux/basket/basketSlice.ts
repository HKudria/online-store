import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {IProduct} from '../products/ProductInterface';

import {RootState} from '../store';

interface IBasketProduct {
    key: IProduct
    value: number
}

interface IRemoveAction {
    product: IProduct
    isMainPage?: boolean
}

export interface BasketState {
    products: IBasketProduct[];
}

const initialState: BasketState = {
    products: [],
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        initBasket(state){
            const basket = localStorage.getItem('basket')
            if(basket !== null){
                state.products = JSON.parse(basket).products
            }
        },
        addToBasket(state, action: PayloadAction<IProduct>) {
            let isNew = false;
            state.products.forEach((product, index) => {
                if (JSON.stringify(product.key) === JSON.stringify(action.payload)) {
                    state.products[index].value += 1;
                    isNew = true;
                }
            })
            if (!isNew) {
                state.products.push({
                    key: action.payload,
                    value: 1
                })
            }
            localStorage.setItem('basket', JSON.stringify(state))
        },
        removeFromBasket(state, action: PayloadAction<IRemoveAction>) {
            let id = -1;
            if (action.payload.isMainPage === true) {
              state.products.forEach((product, index) => {
                if (JSON.stringify(product.key) === JSON.stringify(action.payload.product)) {
                  id = index
                }
              })
            } else {
              state.products.forEach((product, index) => {
                if (JSON.stringify(product.key) === JSON.stringify(action.payload.product)) {
                  if (product.value > 1) {
                    state.products[index].value -= 1;
                  } else {
                    id = index
                  }
                }
              })
            }
            if (id >= 0) {
                state.products.splice(id, 1)
            }
            localStorage.setItem('basket', JSON.stringify(state))
        },
    }
});

export const {addToBasket, removeFromBasket, initBasket} = basketSlice.actions;

export const getBasketState = (state: RootState): BasketState => state.basket;

export default basketSlice.reducer;
