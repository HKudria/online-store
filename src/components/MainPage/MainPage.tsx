import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom'

import {filterProduct, getProductsState, parseProducts, sort} from '../../redux/products/productsSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import s from './MainPage.module.css';
import {Filters} from './Filters/Filters';
import {Products} from './Products/Products';
import {useQuery, serializeQuery} from '../Helper/QueryParser'

export enum ProductsCardSizeEnum {
    Small = 'small',
    Full = 'full',
}

export const MainPage = () => {
    const products = useAppSelector(getProductsState);
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [price, setPrice] = useState<number[]>([]);
    const [stock, setStock] = useState<number[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewType, setViewType] = useState<string>(ProductsCardSizeEnum.Full);
    const [search, setSearch] = useState<string>('');
    const [sortParams, setSortParams] = useState<string>('');
    const query = useQuery()

    const deserializeQuery = async (params: string[]) => {
        await dispatch(parseProducts());
            params.forEach((key) => {
                const data = query.get(key)
                if (data !== null && data.length > 0) {
                    switch (key) {
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
                        case 'view':
                            setViewType(data)
                            break;
                        case 'sort':
                            sortProducts(data)
                            break;
                        case 'search':
                            setSearch(data)
                            break;
                    }
                }
            })
    }

    useEffect(() => {
        deserializeQuery(['category', 'brand', 'price', 'stock', 'view', 'search', 'sort'])
    }, []);

    useEffect(() => {
        dispatch(
            filterProduct({
                categories,
                brands,
                price,
                stock,
                search
            }),
        );
        setSearchParams(serializeQuery({
            'category': categories,
            'brand': brands,
            price,
            stock,
            'sort': sortParams,
            'view': viewType,
            search
        }))
    }, [brands, categories, price, stock, search, sortParams, viewType]);

    const onChangeCategory = (category: string) => {
        if (!categories.includes(category)) {
            setCategories((old) => [...old, category]);
        } else {
            const filteredArray = categories.filter((item) => item !== category);
            setCategories(filteredArray);
        }
    };

    const onChangeBrands = (brand: string, reset?: boolean) => {
        if ((reset === true)) {
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

    const sortProducts = (value: string) => {
        setSortParams(value)
        const parseValue = value.split('↑');
        if (
            parseValue[1] === 'price' ||
            parseValue[1] === 'rating' ||
            parseValue[1] === 'discountPercentage'
        ) {
            dispatch(sort({type: parseValue[0], action: parseValue[1]}));
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
                selectedBrands={brands}
                onChangeCategory={onChangeCategory}
                onChangeBrands={onChangeBrands}
                onChangePrice={setPrice}
                onChangeStock={setStock}
                resetFilter={resetFilters}
            />
            <Products
                products={products.filteredProduct}
                status={products.status}
                sortType={sortParams}
                viewType={viewType}
                onChangeSearch={setSearch}
                onChangeView={setViewType}
                sortProduct={sortProducts}
            />
        </div>
    );
};
