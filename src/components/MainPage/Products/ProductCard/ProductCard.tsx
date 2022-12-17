import s from './ProductCard.module.css';
import {Button} from '../../Filters/Button/Button'
import iPhone from '../../../../assets/image/iphone.png'
import {IProduct} from '../../../../redux/products/ProductInterface'
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button as MaterialButton, CardActionArea, CardActions} from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


interface IProductCardInterface {
    product: IProduct
}

export const ProductCard: React.FC<IProductCardInterface> = (props: IProductCardInterface) => {
    const {product} = props
    return (
        <>
            {/* <div className={s.cardWrapper}> */}
            {/*    <h3 className={s.title}>{product.title}</h3> */}
            {/*    <ul className={s.description}> */}
            {/*        {product.description} */}
            {/*        <li>Category: {product.category}</li> */}
            {/*        <li>Brand: {product.brand}</li> */}
            {/*        <li>Price: €{product.price}</li> */}
            {/*        <li>Discount: {product.discountPercentage}%</li> */}
            {/*        <li>Rating: {product.rating}</li> */}
            {/*        <li>Stock: {product.stock}</li> */}
            {/*    </ul> */}
            {/*    <div className={s.buttonsWrapper}> */}
            {/*        <Button name='App to card'/> */}
            {/*        <Button name='Details'/> */}
            {/*    </div> */}
            {/*    <img className={s.cardImg} src={product.thumbnail ?? iPhone} alt='iphone'/> */}
            {/* </div> */}
            <Card sx={{maxWidth: 345, width: '100%', height: 460}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="160"
                        image={product.thumbnail ?? iPhone}
                        alt={product.title}
                    />
                    <CardContent sx={{height: 220}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title.length > 25 ? product.title.substring(0, 24) + '...' : product.title}
                        </Typography>
                        <Box sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Rating name="read-only" value={product.rating} precision={0.1} readOnly/>
                            <Box sx={{ml: 2}}>{product.rating}</Box></Box>
                        <ul>
                            <li>Category: {product.category}</li>
                            <li>Brand: {product.brand}</li>
                            <li>Price: {product.price}€</li>
                            <li>Discount: {product.discountPercentage}%</li>
                            <li>Stock: {product.stock}</li>
                        </ul>
                        <Typography variant="body2" color="text.secondary">
                            {product.description.length > 142 ? product.description.substring(0, 140) + '...' : product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <MaterialButton size="small" color="primary">
                        Add to card
                    </MaterialButton>
                    <MaterialButton size="small" color="primary">
                        More
                    </MaterialButton>
                </CardActions>
            </Card>
        </>
    )
}


