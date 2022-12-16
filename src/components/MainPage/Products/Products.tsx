import s from './Products.module.css';
import {ProductsHeader} from './ProductsHeader/ProductsHeader';
import {ProductCard} from './ProductCard/ProductCard'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useEffect} from 'react';
import {getProducts, parseProducts} from '../../../redux/products/productsSlice';

export const Products = () => {

    const products = useAppSelector(getProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(parseProducts())
    },[]);

    return (
        <div className={s.productsWrapper}>
            <ProductsHeader/>
            <div className={s.cardWrapper}>
                {products.map((product, index) => <ProductCard key={index} product={product} /> )}
            </div>
        </div>
    )
}