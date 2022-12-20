import s from './MainPage.module.css';
import { Filters } from './Filters/Filters';
import { Products } from './Products/Products';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getProductsState, parseProducts, filterProduct} from '../../redux/products/productsSlice';
import {useEffect, useState} from 'react';

export const MainPage = () => {
    const products = useAppSelector(getProductsState);
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        dispatch(parseProducts())
    }, []);

    useEffect(() => {
      dispatch(filterProduct(
          {
              categories,
              brands,
          }
      ))
    }, [brands,categories, products.products]);

    const onChangeCategory = (category: string) => {
        if(!categories.includes(category)){
            setCategories(old => [...old, category])
        } else {
            const filteredArray = categories.filter((item=>item !== category))
            setCategories(filteredArray)
        }
    }

    const onChangeBrands = (brand: string) => {
        if(!brands.includes(brand)){
            setBrands(old => [...old, brand])
        } else {
            const filteredArray = brands.filter((item=>item !== brand))
            setBrands(filteredArray)
        }
    }

    const resetFilters = () => {
        setCategories([])
        setBrands([])
    }

  return (
    <div className={s.wrapper}>
      <Filters products={products.products}
               selectedCategories={categories}
               onChangeCategory={onChangeCategory}
               onChangeBrands={onChangeBrands}
               resetFilter={resetFilters}/>
      <Products products={products.filteredProduct} status={products.status}/>
    </div>
  )
}