import s from './MainPage.module.css';
import { Filters } from './Filters/Filters';
import { Products } from './Products/Products';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getProductsState, parseProducts} from '../../redux/products/productsSlice';
import {useEffect} from 'react';

export const MainPage = () => {
    const products = useAppSelector(getProductsState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(parseProducts())
    }, []);


  return (
    <div className={s.wrapper}>
      <Filters />
      <Products products={products.products} status={products.status}/>
    </div>
  )
}