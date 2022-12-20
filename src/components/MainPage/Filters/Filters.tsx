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
    minPrice: number;
    maxPrice: number;
    initMaxPrice: number;
    minStock: number;
    maxStock: number;
    initMaxStock: number;
}

export const Filters = ({
                            products,
                            selectedCategories,
                            onChangeCategory,
                            onChangeBrands,
                            onChangePrice,
                            onChangeStock,
                            resetFilter,
                            minPrice,
                            maxPrice,
                            initMaxPrice,
                            minStock,
                            maxStock,
                            initMaxStock,
                        }: IFiltersInterface) => {
    const [categories, setCategories] = useState<Set<string>>(new Set());
    const [brands, setBrands] = useState<Set<string>>(new Set());

    useEffect(() => {
        const tmpSet = new Set<string>()
        products.forEach(product => {
            setCategories(set => set.add(product.category))
            if (selectedCategories.length !== 0) {
                selectedCategories.forEach(category => {
                    if (product.category.toLowerCase().includes(category.toLowerCase())) {
                        tmpSet.add(product.brand)
                    }
                })
                setBrands(tmpSet)
            } else {
                setBrands(set => set.add(product.brand))
            }
        })
    }, [products, selectedCategories]);


    return (
        <div className={s.filterContent}>
            <div className={s.buttonsWrapper}>
                <Button name="Reset Filters" callback={resetFilter}/>
                <Button name="Copy Link"/>
            </div>
            <div className={s.filtersWrapper}>
                <FilterBlock title="Category" data={Array.from(categories)} onChangeFn={onChangeCategory}/>
                <FilterBlock title="Brand" data={Array.from(brands)} onChangeFn={onChangeBrands}/>
                <RangeBlock title="Price" from={minPrice} to={maxPrice} onChange={onChangePrice} initMax={initMaxPrice}/>
                <RangeBlock title="Stock" from={minStock} to={maxStock} onChange={onChangeStock} initMax={initMaxStock}/>
            </div>
        </div>
    )
}