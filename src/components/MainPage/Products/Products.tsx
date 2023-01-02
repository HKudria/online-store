import CircularProgress from '@mui/material/CircularProgress';

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
  viewType: string;
  sortType: string;
  onChangeSearch: (search: string) => void;
  onChangeView: (view: string) => void;
  sortProduct: (sort: string) => void;
}

export const Products = ({ products, status, viewType, onChangeSearch, onChangeView, sortProduct, sortType }: IProductsProps) => {

  if (status === 'loading') {
    return (
      <div className={`${s.productsWrapper} ${s.spinner}`}>
        <CircularProgress />
      </div>
    );
  }

  const notFoundMessage = () => {
      return (
          <div><h1>Products not found</h1></div>
      )
    }

  return (
      <div className={s.productsWrapper}>
        <ProductsHeader
            count={products.length}
            sortType={sortType}
            sort={sortProduct}
            view={onChangeView}
            filter={onChangeSearch}
        />
        <div className={s.cardWrapper}>
          {products.length !== 0 ? products.map((product) => {
            return <ProductCard key={product.id} product={product} viewType={viewType}/>;
          }) : notFoundMessage() }
        </div>
      </div>
  );
};
