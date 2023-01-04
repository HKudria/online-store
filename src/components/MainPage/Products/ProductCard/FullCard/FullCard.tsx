import React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import Rating from '@mui/material/Rating';

import {IProduct} from '../../../../../redux/products/ProductInterface';
import {substringStr} from '../../../../Helper/StringHelper';

import iPhone from '../../../../../assets/image/iphone.png';

import {MainPageButton} from '../MainPageButton/MainPageButton';
import {BasketButton} from '../BasketButton/BasketButton';


interface IProductCardInterface {
    product: IProduct;
    isAdded?: boolean;
    callback?: (e: React.MouseEvent) => void;
    count?: number
    id?: number
}

export const FullCard: React.FC<IProductCardInterface> = ({product, isAdded, callback, count, id}: IProductCardInterface) => {

    return (
        <>
            <Card sx={{maxWidth: 345, width: '100%', height: 470, position: 'relative'}}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        height='160'
                        image={product.thumbnail ?? iPhone}
                        alt={product.title}
                    />
                    <CardContent sx={{height: 220}}>
                        <Typography gutterBottom variant='h5' component='div'>
                            {substringStr(product.title,25)}
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
                            {substringStr(product.description, 141)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {count === undefined ? <MainPageButton isAdded={isAdded ?? false} callback={callback ?? undefined}  /> :
                        <BasketButton product={product} count={count} /> }
                </CardActions>
                {id ? <><Box sx={{left: 5, bottom: 2, position: 'absolute'}} color='blue'>ID: {id}</Box><br></br></> : ''}
            </Card>
        </>
    );
};