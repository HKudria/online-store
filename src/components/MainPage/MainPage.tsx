import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'

import { filterProduct, getProductsState, parseProducts } from '../../redux/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import s from './MainPage.module.css';
import { Filters } from './Filters/Filters';
import { Products } from './Products/Products';
import {useQuery, serializeQuery} from '../Helper/QueryParser'

export const MainPage = () => {
  const products = useAppSelector(getProductsState);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [stock, setStock] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQuery()

  const deserializeQuery = (params: string[]) => {
    params.forEach((key) => {
      const data = query.get(key)
      if(data !== null && data.length > 0){
        switch (key){
          case 'category':
            setCategories(data.split('↑'))
            break;
          case 'brand':
            setBrands(data.split('↑'))
            break;
          case 'price':
            setPrice(data.split('↑').map(el => parseInt(el)))
            break;
          case 'stock':
            setStock(data.split('↑').map(el => parseInt(el)))
            break;
        }
      }
    })
  }

  useEffect(() => {
    dispatch(parseProducts());
    // deserializeQuery(['category', 'brands', 'price', 'stock'])
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
    setSearchParams(serializeQuery({'category': categories, 'brand': brands, 'price': price, 'stock': stock, 'sort': products.sortProduct}))
  }, [brands, categories, price, stock, products.sortProduct]);

  const onChangeCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((old) => [...old, category]);
    } else {
      const filteredArray = categories.filter((item) => item !== category);
      setCategories(filteredArray);
    }
  };

  const onChangeBrands = (brand: string, reset?: boolean) => {
    if((reset === true)){
      setBrands([''])
    } else {
      if (!brands.includes(brand)) {
        setBrands((old) => [...old, brand]);
      } else {
        const filteredArray = brands.filter((item) => item !== brand);
        setBrands(filteredArray);
      }
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
