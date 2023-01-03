import {IProduct} from '../products/ProductInterface';

export interface IBasketProduct {
  key: IProduct
  value: number
}

export interface IDiscount {
  key: string
  value: number
}

export interface IRemoveAction {
  product: IProduct
  isMainPage?: boolean
}

export interface BasketState {
  products: IBasketProduct[];
  discount: IDiscount[];
  totalAmount: number;
  discountAmount: number;
}