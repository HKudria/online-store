import s from './Products.module.css';
import {ProductsHeader} from './ProductsHeader/ProductsHeader';
import {ProductCard} from './ProductCard/ProductCard'
import {useAppDispatch} from '../../../redux/hooks';
import {useEffect, useState} from 'react';
import {sort} from '../../../redux/products/productsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import {ProductCardSmall} from './ProductCardSmall/ProductCardSmall';
import {IProduct} from '../../../redux/products/ProductInterface';

export enum ProductsCardSizeEnum {
    Small = 'small',
    Full = 'full'
}

interface IProductsProps {
    products: IProduct[]
    status: string
}

export const Products = ({products, status}: IProductsProps) => {
    const dispatch = useAppDispatch();
    const [viewType, setViewType] = useState<string>(ProductsCardSizeEnum.Full);
    const [filter, setFilter] = useState<string>('');
    const [productsStore, setProductsStore] = useState<IProduct[]>(products);

    useEffect(() => {
        if (filter !== '') {
            setProductsStore(products.filter((product) => product.description.toLowerCase().includes(filter.toLowerCase()) || product.title.toLowerCase().includes(filter.toLowerCase()))
            )
        } else {
            setProductsStore(products)
        }
    }, [filter, products]);

    if (status === 'loading') {
        return (
            <div className={`${s.productsWrapper} ${s.spinner}`}>
                <CircularProgress/>
            </div>
        )
    }

    const sortProducts = (value: string) => {
        const parseValue = value.split('.')
        if (parseValue[1] === 'price' || parseValue[1] === 'rating' || parseValue[1] === 'discountPercentage') {
            dispatch(sort({type: parseValue[0], action: parseValue[1]}))
        }
    }

    return (
        <div className={s.productsWrapper}>
            <ProductsHeader
                count={productsStore.length}
                sort={sortProducts}
                view={setViewType}
                filter={setFilter}
            />
            <div className={s.cardWrapper}>
                {productsStore.map((product) => {
                    if (viewType === ProductsCardSizeEnum.Full) {
                        return <ProductCard key={product.id} product={product}/>
                    }
                    return <ProductCardSmall key={product.id} product={product}/>
                })}
            </div>
        </div>
    )
}