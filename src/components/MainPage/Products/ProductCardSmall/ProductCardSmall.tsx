import iPhone from '../../../../assets/image/iphone.png'
import {IProduct} from '../../../../redux/products/ProductInterface'
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button as MaterialButton} from '@mui/material';
import Box from '@mui/material/Box';


interface IProductCardSmallInterface {
    product: IProduct
}

export const ProductCardSmall: React.FC<IProductCardSmallInterface> = ({product}: IProductCardSmallInterface) => {
    return (
        <>
            <Card sx={{ display: 'flex',height:150, width: 400}}>
                <CardMedia
                    component="img"
                    sx={{ maxWidth: 150, maxHeight: 150}}
                    image={product.thumbnail ?? iPhone}
                    alt={product.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {product.title.length > 25 ? product.title.substring(0, 24) + '...' : product.title}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <MaterialButton size="small" color="primary">
                            Add to card
                        </MaterialButton>
                        <MaterialButton size="small" color="primary">
                            More
                        </MaterialButton>
                    </Box>
                </Box>

            </Card>

        </>
    )
}


