import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getBasketState, initBasket} from '../../redux/basket/basketSlice';

import {FullCard} from '../MainPage/Products/ProductCard/FullCard/FullCard';
import {serializeQuery, useQuery} from '../Helper/QueryParser';

import {PromoBlock} from './PromoBlock/PromoBlock';
import s from './BasketPage.module.css';

interface IBasketProps {
    itemsPerPage: number
}

export const BasketPage = ({itemsPerPage}: IBasketProps) => {
    const dispatch = useAppDispatch();
    const [itemsPage, setItemsPage] = useState<number>(itemsPerPage ?? 0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState<number>(0)
    const query = useQuery()
    const basket = useAppSelector(getBasketState);
    const [isLoaded, setIsLoaded] = useState<boolean>(true)
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPage;
    const currentItems = basket.products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(basket.products.length / itemsPage);


    const handlePageClick = (event: { selected: number; }) => {
        setPageNumber(event.selected)
        const newOffset = (event.selected * itemsPage) % basket.products.length;
        setItemOffset(newOffset);
    };

    const deserializeQuery = (params: string[]) => {
        params.forEach((key) => {
            const data = query.get(key)
            if (data !== null && data.length > 0) {
                switch (key) {
                    case 'itemPerPage':
                        setItemsPage(parseInt(data))
                        break;
                    case 'pageNumber':
                        handlePageClick({selected: parseInt(data) > basket.products.length / itemsPage ? 0 : parseInt(data)})
                        break;
                }
            }
        })
        setIsLoaded(false)
    }

    useEffect(() => {
        dispatch(initBasket())
    }, []);

    useEffect(() => {
        deserializeQuery(['itemPerPage', 'pageNumber'])
    }, [basket.products]);

    useEffect(() => {
        if (!isLoaded) {
            setSearchParams(serializeQuery({
                'itemPerPage': itemsPage.toString(),
                'pageNumber': pageNumber.toString()
            }))
        }
    }, [itemsPage, pageNumber, basket]);


    const changePage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemsPage(isNaN(parseInt(event.currentTarget.value)) ? 1 : parseInt(event.currentTarget.value))
        if (parseInt(event.currentTarget.value) >= basket.products.length) {
            handlePageClick({selected: 0})
        }
    }

export const BasketPage = () => {
  return (
    <div>
      Basket Page
    </div>
  )
}

