import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button as MaterialButton} from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {NavLink} from 'react-router-dom';

import {IProduct} from '../../../../redux/products/ProductInterface';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addToBasket, getBasketState, removeFromBasket} from '../../../../redux/basket/basketSlice';

import iPhone from '../../../../assets/image/iphone.png';
import {ProductsCardSizeEnum} from '../Products';



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

    const smallCard = () => {
        return(
        <Card sx={{ display: 'flex', height: 150, width: 400 }}>
            <CardMedia
                component='img'
                sx={{ maxWidth: 150, maxHeight: 150 }}
                image={product.thumbnail ?? iPhone}
                alt={product.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component='div' variant='h5'>
                        {product.title.length > 25 ? product.title.substring(0, 24) + '...' : product.title}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <MaterialButton size='small' color={isAdded?'primary':'success'} onClick={(e) => addProductToBasket(e)}>
                        Add to card
                    </MaterialButton>
                    <MaterialButton size='small' color='primary'>
                        More
                    </MaterialButton>
                </Box>
            </Box>
        </Card>
        )
    }

    const fullCard = () => {
        return(
        <Card sx={{maxWidth: 345, width: '100%', height: 460}}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    height='160'
                    image={product.thumbnail ?? iPhone}
                    alt={product.title}
                />
                <CardContent sx={{height: 220}}>
                    <Typography gutterBottom variant='h5' component='div'>
                        {product.title.length > 25 ? product.title.substring(0, 24) + '...' : product.title}
                    </Typography>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating name='read-only' value={product.rating} precision={0.1} readOnly/>
                        <Box sx={{ml: 2}}>{product.rating}</Box>
                    </Box>
                    <ul>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>Price: {product.price}€</li>
                        <li>Discount: {product.discountPercentage}%</li>
                        <li>Stock: {product.stock}</li>
                    </ul>
                    <Typography variant='body2' color='text.secondary'>
                        {product.description.length > 142
                            ? product.description.substring(0, 140) + '...'
                            : product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <MaterialButton size='small' color={isAdded?'primary':'success'} onClick={(e) => addProductToBasket(e)}>
                    Add to card
                </MaterialButton>
                <MaterialButton size='small' color='primary'>
                    More
                </MaterialButton>
            </CardActions>
        </Card>
        )
    }

    return (
        <>
            <NavLink to={'/ProductPage/' + String(product.id)}>
                {viewType === ProductsCardSizeEnum.Full ? fullCard() : smallCard() }
            </NavLink>
        </>
    );
};
