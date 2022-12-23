import { useEffect, useState } from 'react';

import { filterProduct, getProductsState, parseProducts } from '../../redux/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import s from './MainPage.module.css';
import { Filters } from './Filters/Filters';
import { Products } from './Products/Products';

export const MainPage = () => {
  const products = useAppSelector(getProductsState);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [stock, setStock] = useState<number[]>([]);

  useEffect(() => {
    dispatch(parseProducts());
  }, []);

  useEffect(() => {
    dispatch(
      filterProduct({
        categories,
        brands,
        price,
        stock,
      }),
    );
  }, [brands, categories, price, stock]);

  const onChangeCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((old) => [...old, category]);
    } else {
      const filteredArray = categories.filter((item) => item !== category);
      setCategories(filteredArray);
    }
  };

  const onChangeBrands = (brand: string) => {
    if (!brands.includes(brand)) {
      setBrands((old) => [...old, brand]);
    } else {
      const filteredArray = brands.filter((item) => item !== brand);
      setBrands(filteredArray);
    }
  };

  const resetFilters = () => {
    setCategories([]);
    setBrands([]);
    setPrice([]);
    setStock([]);
    document.querySelectorAll('input[type=checkbox]').forEach((el) => {
      (el as HTMLInputElement).checked = false;
    });
  };

  return (
    <div className={s.wrapper}>
      <Filters
        store={products}
        selectedCategories={categories}
        onChangeCategory={onChangeCategory}
        onChangeBrands={onChangeBrands}
        onChangePrice={setPrice}
        onChangeStock={setStock}
        resetFilter={resetFilters}
      />
      <Products products={products.filteredProduct} status={products.status} />
    </div>
  );
};
