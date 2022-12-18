import s from './Filters.module.css';
import {Button} from './Button/Button';
import {FilterBlock} from './FilterBlock/FilterBlock';
import {RangeBlock} from './RangeBlock/RangeBlock';
import {IProduct} from '../../../redux/products/ProductInterface';
import {useEffect, useState} from 'react';

interface IFiltersInterface {
    products: IProduct[]
}

export const Filters = (props: IFiltersInterface) => {
    const [categories, setCategories] = useState<Set<string>>(new Set());
    const [brands, setBrands] = useState<Set<string>>(new Set());
    const [priceMin, setPriceMin] = useState<number>(0)
    const [priceMax, setPriceMax] = useState<number>(0)
    const [stockMin, setStockMin] = useState<number>(0)
    const [stockMax, setStockMax] = useState<number>(0)

    useEffect(() => {
        props.products.forEach(product => {
            setCategories(set => set.add(product.category))
            setBrands(set => set.add(product.brand))
            if (product.price < priceMin) setPriceMin(product.price)
            if (product.price > priceMax) setPriceMax(product.price)
            if (product.stock > stockMax) setStockMax(product.stock)
            if (product.stock < stockMin) setStockMin(product.stock)
        })
    }, [props.products]);

    return (
        <div className={s.filterContent}>
            <div className={s.buttonsWrapper}>
                <Button name="Reset Filters"/>
                <Button name="Copy Link"/>
            </div>
            <div className={s.filtersWrapper}>
                <FilterBlock title="Category" data={Array.from(categories)}/>
                <FilterBlock title="Brand" data={Array.from(brands)}/>
                <RangeBlock title="Price" from={priceMin} to={priceMax}/>
                <RangeBlock title="Stock" from={stockMin} to={stockMax}/>
            </div>
        </div>
    )
}