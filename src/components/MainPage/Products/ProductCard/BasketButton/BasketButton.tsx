import {NavLink} from 'react-router-dom';
import {Button as MaterialButton} from '@mui/material';

import {useAppDispatch} from '../../../../../redux/hooks';
import {IProduct} from '../../../../../redux/products/ProductInterface';
import {addToBasket, removeFromBasket} from '../../../../../redux/basket/basketSlice';


interface IMainPageButtonProps {
    product: IProduct;
    count: number;
}

export const BasketButton = ({product, count}: IMainPageButtonProps) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <MaterialButton size='small' color='primary' onClick={() => dispatch(addToBasket(product))} >
                ADD
            </MaterialButton>
            -- ({count}) --
            <MaterialButton size='small' color='primary' onClick={() => dispatch(removeFromBasket({product}))}>
                REMOVE
            </MaterialButton>
            <MaterialButton size='small' color='secondary'>
                <NavLink to={`/ProductPage/${product.id}`}>MORE</NavLink>
            </MaterialButton>
        </>
    )
}