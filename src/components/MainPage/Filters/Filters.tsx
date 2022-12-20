import s from './Filters.module.css';
import {Button} from './Button/Button';
import {FilterBlock} from './FilterBlock/FilterBlock';
import {RangeBlock} from './RangeBlock/RangeBlock';
import {IProduct} from '../../../redux/products/ProductInterface';
import {useEffect, useState} from 'react';

interface IFiltersInterface {
    products: IProduct[]
    selectedCategories: string[]
    onChangeCategory: (category: string) => void
    onChangeBrands: (category: string) => void
    onChangePrice: (number: number[]) => void
    onChangeStock: (number: number[]) => void
    resetFilter: () => void
}

export const Filters = ({products, selectedCategories, onChangeCategory, onChangeBrands, onChangePrice, onChangeStock, resetFilter}: IFiltersInterface) => {
    const [categories, setCategories] = useState<Set<string>>(new Set());
    const [brands, setBrands] = useState<Set<string>>(new Set());
    const [priceMin, setPriceMin] = useState<number>(0)
    const [priceMax, setPriceMax] = useState<number>(0)
    const [stockMin, setStockMin] = useState<number>(0)
    const [stockMax, setStockMax] = useState<number>(0)

    useEffect(() => {
        const tmpSet = new Set<string>()
        products.forEach(product => {
            setCategories(set => set.add(product.category))
            if (selectedCategories.length !== 0){
                selectedCategories.forEach(category => {
                    if (product.category.toLowerCase().includes(category.toLowerCase())){
                        tmpSet.add(product.brand)
                    }
                })
                setBrands(tmpSet)
            } else {
                setBrands(set => set.add(product.brand))
            }
            if (product.price < priceMin) setPriceMin(product.price)
            if (product.price > priceMax) setPriceMax(product.price)
            if (product.stock > stockMax) setStockMax(product.stock)
            if (product.stock < stockMin) setStockMin(product.stock)
        })
    }, [products, selectedCategories]);


    return (
        <div className={s.filterContent}>
            <div className={s.buttonsWrapper}>
                <Button name="Reset Filters" callback={resetFilter}/>
                <Button name="Copy Link"/>
            </div>
            <div className={s.filtersWrapper}>
                <FilterBlock title="Category" data={Array.from(categories)} onChangeFn={onChangeCategory} />
                <FilterBlock title="Brand" data={Array.from(brands)} onChangeFn={onChangeBrands}/>
                <RangeBlock title="Price" from={priceMin} to={priceMax} onChange={onChangePrice}/>
                <RangeBlock title="Stock" from={stockMin} to={stockMax} onChange={onChangeStock}/>
            </div>
        </div>
    )
}