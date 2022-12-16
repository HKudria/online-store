import s from './Products.module.css';
import { ProductsHeader } from './ProductsHeader/ProductsHeader';
import { ProductCard } from './ProductCard/ProductCard.jsx'

export const Products = () => {
  return (
    <div className={s.productsWrapper}>
      <ProductsHeader />
      <div className={s.cardWrapper}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      
    </div>
  )
}