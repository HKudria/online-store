import { MouseEvent, FC } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {IProduct} from '../../../../../redux/products/ProductInterface';
import {substringStr} from '../../../../Helper/StringHelper';
import {MainPageButton} from '../MainPageButton/MainPageButton';

import iPhone from '../../../../../assets/image/iphone.png';

interface IProductCardInterface {
    product: IProduct;
    isAdded: boolean;
    callback: (e: MouseEvent) => void;
}

export const SmallCard: FC<IProductCardInterface> = ({product, isAdded, callback}: IProductCardInterface) => {
    return (
        <>
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
                            {substringStr(product.title,25)}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                      <MainPageButton isAdded={isAdded} callback={callback} />
                    </Box>
                </Box>
            </Card>
        </>
    );
};
