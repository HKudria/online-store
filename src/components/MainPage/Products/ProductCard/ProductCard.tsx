import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {IProduct} from '../../../../redux/products/ProductInterface';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addToBasket, getBasketState, removeFromBasket} from '../../../../redux/basket/basketSlice';

import {ProductsCardSizeEnum} from '../../MainPage';
import {FullCard} from './FullCard/FullCard';
import {SmallCard} from './SmallCard/SmallCard';

interface IProductCardInterface {
    product: IProduct;
    viewType: string;
}

export const ProductCard: React.FC<IProductCardInterface> = ({
                                                                 product, viewType
                                                             }: IProductCardInterface) => {
    const dispatch = useAppDispatch();
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const basket = useAppSelector(getBasketState);

    useEffect(() => {
        basket.products.forEach((pr) => {
            if (JSON.stringify(pr.key) === JSON.stringify(product)) {
                setIsAdded(true)
            }
        })
    }, []);

    const addProductToBasket = (event: React.MouseEvent) => {
        event.preventDefault()
        if (isAdded){
            dispatch(removeFromBasket({product, isMainPage: true}))
            setIsAdded(false)
        } else {
            dispatch(addToBasket(product))
            setIsAdded(true)
        }
    }

    return (
        <>
            <NavLink to={`/ProductPage/${product.id}`}>
                {viewType === ProductsCardSizeEnum.Full ? <FullCard product={product} isAdded={isAdded} callback={addProductToBasket} />
                    : <SmallCard product={product} isAdded={isAdded} callback={addProductToBasket} />}
            </NavLink>
        </>
    );
};
