import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch } from '../../../redux/hooks';
import { findProduct, sort } from '../../../redux/products/productsSlice';
import { IProduct } from '../../../redux/products/ProductInterface';

import s from './Products.module.css';
import { ProductsHeader } from './ProductsHeader/ProductsHeader';
import { ProductCard } from './ProductCard/ProductCard';

export enum ProductsCardSizeEnum {
  Small = 'small',
  Full = 'full',
}

interface IProductsProps {
  products: IProduct[];
  status: string;
}

export const Products = ({ products, status }: IProductsProps) => {
  const dispatch = useAppDispatch();
  const [viewType, setViewType] = useState<string>(ProductsCardSizeEnum.Full);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    dispatch(findProduct(filter));
  }, [filter]);

  if (status === 'loading') {
    return (
      <div className={`${s.productsWrapper} ${s.spinner}`}>
        <CircularProgress />
      </div>
    );
  }

  const sortProducts = (value: string) => {
    const parseValue = value.split('.');
    if (
      parseValue[1] === 'price' ||
      parseValue[1] === 'rating' ||
      parseValue[1] === 'discountPercentage'
    ) {
      dispatch(sort({ type: parseValue[0], action: parseValue[1] }));
    }
  };

  return (
    <div className={s.productsWrapper}>
      <ProductsHeader
        count={products.length}
        sort={sortProducts}
        view={setViewType}
        filter={setFilter}
      />
      <div className={s.cardWrapper}>
        {products.map((product) => {
            return <ProductCard key={product.id} product={product} viewType={viewType}/>;
        })}
      </div>
    </div>
  );
};
