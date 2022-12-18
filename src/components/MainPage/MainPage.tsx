import s from './MainPage.module.css';
import { Filters } from './Filters/Filters';
import { Products } from './Products/Products';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getProductsState, parseProducts} from '../../redux/products/productsSlice';
import {useEffect, useState} from 'react';
import {IProduct} from '../../redux/products/ProductInterface';

export const MainPage = () => {
    const products = useAppSelector(getProductsState);
    const dispatch = useAppDispatch();
    const [productsStore, setProductsStore] = useState<IProduct[]>(products.products);
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        dispatch(parseProducts())
    }, []);

    useEffect(() => {
        if (categories.length !== 0 && brands.length !== 0) {
            setProductsStore(findByBrand(findByCategory()))
        } else if (categories.length !== 0) {
            setProductsStore(findByCategory())
        } else if (brands.length !== 0) {
            setProductsStore(findByBrand())
        } else {
            setProductsStore(products.products)
        }
    }, [brands,categories, products.products]);

    function findByCategory() {
        let tmpArray:IProduct[] = []
        categories.forEach(category => {
            const filteredArray = products.products.filter((product) => product.category === category)
            tmpArray = tmpArray.concat(filteredArray)
        })
        return tmpArray
    }

    function findByBrand(sortedArray?: IProduct[]) {
        let tmpArray:IProduct[] = []
        brands.forEach(brand => {
            const filteredArray = (sortedArray ?? products.products).filter((product) => product.brand === brand)
            tmpArray = tmpArray.concat(filteredArray)
        })
        return tmpArray
    }

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
        setProductsStore(products.products)
    }

  return (
    <div className={s.wrapper}>
      <Filters products={products.products}
               selectedCategories={categories}
               onChangeCategory={onChangeCategory}
               onChangeBrands={onChangeBrands}
               resetFilter={resetFilters}/>
      <Products products={productsStore} status={products.status}/>
    </div>
  )
}