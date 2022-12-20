import s from './MainPage.module.css';
import {Filters} from './Filters/Filters';
import {Products} from './Products/Products';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getProductsState, parseProducts, filterProduct} from '../../redux/products/productsSlice';
import {useEffect, useState} from 'react';

export const MainPage = () => {
    const products = useAppSelector(getProductsState);
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [price, setPrice] = useState<number[]>([]);
    const [stock, setStock] = useState<number[]>([]);

    useEffect(() => {
        dispatch(parseProducts())
    }, []);

    useEffect(() => {
        dispatch(filterProduct(
            {
                categories,
                brands,
                price,
                stock,
            }
        ))
    }, [brands, categories, price, stock]);

    const onChangeCategory = (category: string) => {
        if (!categories.includes(category)) {
            setCategories(old => [...old, category])
        } else {
            const filteredArray = categories.filter((item => item !== category))
            setCategories(filteredArray)
        }
    }

    const onChangeBrands = (brand: string) => {
        if (!brands.includes(brand)) {
            setBrands(old => [...old, brand])
        } else {
            const filteredArray = brands.filter((item => item !== brand))
            setBrands(filteredArray)
        }
    }

    const resetFilters = () => {
        setCategories([])
        setBrands([])
        setPrice([])
        setStock([])
    }

    return (
        <div className={s.wrapper}>
            <Filters products={products.products}
                     selectedCategories={categories}
                     onChangeCategory={onChangeCategory}
                     onChangeBrands={onChangeBrands}
                     onChangePrice={setPrice}
                     onChangeStock={setStock}
                     resetFilter={resetFilters}
                     minPrice={products.minPrice}
                     maxPrice={products.maxPrice}
                     initMaxPrice={products.initMaxPrice}
                     minStock={products.minStock}
                     maxStock={products.maxStock}
                     initMaxStock={products.initMaxStock}/>
            <Products products={products.filteredProduct} status={products.status}/>
        </div>
    )
}