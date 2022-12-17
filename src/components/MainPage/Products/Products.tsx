import s from './Products.module.css';
import {ProductsHeader} from './ProductsHeader/ProductsHeader';
import {ProductCard} from './ProductCard/ProductCard'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useEffect, useState} from 'react';
import {getProductsState, parseProducts, sort} from '../../../redux/products/productsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import {ProductCardSmall} from './ProductCardSmall/ProductCardSmall';

export enum ProductsCardSizeEnum {
    Small = 'small',
    Full = 'full'
}

export const Products = () => {
    const products = useAppSelector(getProductsState);
    const dispatch = useAppDispatch();
    const [viewType, setViewType] = useState<string>(ProductsCardSizeEnum.Full);

    useEffect(() => {
        dispatch(parseProducts())
    }, []);

    if (products.status === 'loading') {
        return (
            <div className={`${s.productsWrapper} ${s.spinner}`}>
                <CircularProgress/>
            </div>
        )
    }

    const sortProducts = (value: string) => {
        const parseValue = value.split('.')
        if(parseValue[1] === 'price' || parseValue[1] === 'rating' || parseValue[1] === 'discountPercentage'){
            dispatch(sort({type:parseValue[0], action:parseValue[1]}))
        }
    }

    return (
        <div className={s.productsWrapper}>
            <ProductsHeader count={products.products.length} sort={sortProducts} view={setViewType}/>
            <div className={s.cardWrapper}>
                {products.products.map((product, index) => {
                    if (viewType === ProductsCardSizeEnum.Full) {
                        return <ProductCard key={index} product={product}/>
                    }
                    return <ProductCardSmall key={index} product={product}/>
                })}
            </div>
        </div>
    )
}