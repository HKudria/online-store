import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IProduct} from '../products/ProductInterface';

import {RootState} from '../store';

export interface IBasketProduct {
    key: IProduct
    value: number
}

export interface IDiscount {
    key: string
    value: number
}

interface IRemoveAction {
    product: IProduct
    isMainPage?: boolean
}

export interface BasketState {
    products: IBasketProduct[];
    discount: IDiscount[];
    totalAmount: number;
    discountAmount: number;
}

const initialState: BasketState = {
    products: [],
    discount: [],
    totalAmount: 0,
    discountAmount: 0,
};

const totalAmount = (state: BasketState) => {
    return state.totalAmount = state.products.reduce((acc: number, item) => {
        acc += item.key.price * item.value
        return acc
    }, 0)
}

const checkIfDiscountWasUsed = (state: BasketState, discount: string) => {
    let out = false
    state.discount.forEach((dis) => {
        if (dis.key === discount) {
           out = true
        }
    })
    return out
}

const getDiscountedPrice = (state: BasketState) => {
    const discount = state.discount.reduce((acc: number, dis)=>{
        acc += dis.value
        return acc
    },0)
    const discountedPrice = state.totalAmount - (state.totalAmount * (discount/100))
    return discountedPrice < 0 ? 0 : discountedPrice
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        initBasket(state){
            const basket = localStorage.getItem('basket')
            if(basket !== null){
                state.products = JSON.parse(basket).products
                state.discount = JSON.parse(basket).discount
            }
            state.totalAmount = totalAmount(state)
            state.discountAmount = getDiscountedPrice(state)
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
            state.totalAmount = totalAmount(state)
            state.discountAmount = getDiscountedPrice(state)
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
            state.totalAmount = totalAmount(state)
            state.discountAmount = getDiscountedPrice(state)
        },
        addDiscount(state, action: PayloadAction<IDiscount>){
            const percent10 = ['ten1','ten2','ten3'];
            const percent20 = ['twenty','twenty1','twenty2'];
            if(percent10.includes(action.payload.key) || percent20.includes(action.payload.key)){
                console.log(checkIfDiscountWasUsed(state, action.payload.key))
                if(!checkIfDiscountWasUsed(state, action.payload.key)){
                    state.discount.push(action.payload)
                }
            }
            state.discountAmount = getDiscountedPrice(state)
            localStorage.setItem('basket', JSON.stringify(state))
        },
        removeDiscount(state, action: PayloadAction<IDiscount>){
            let id = -1;
            state.discount.forEach((dis, index) => {
                if (dis.key === action.payload.key) {
                    id = index
                }
            })
            state.discount.splice(id,1)
            state.discountAmount = getDiscountedPrice(state)
            localStorage.setItem('basket', JSON.stringify(state))
        }
    }
});

export const {addToBasket, removeFromBasket, initBasket, addDiscount, removeDiscount} = basketSlice.actions;

export const getBasketState = (state: RootState): BasketState => state.basket;

export default basketSlice.reducer;
