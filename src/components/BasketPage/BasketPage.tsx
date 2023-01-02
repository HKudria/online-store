import s from './BasketPage.module.css';
import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getBasketState, initBasket} from '../../redux/basket/basketSlice';
import {FullCard} from '../MainPage/Products/ProductCard/FullCard/FullCard';
import {PromoBlock} from './PromoBlock/PromoBlock';

interface IBasketProps {
    itemsPerPage: number
}

export const BasketPage = ({itemsPerPage}: IBasketProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initBasket());
    }, []);

    const basket = useAppSelector(getBasketState);

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = basket.products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(basket.products.length / itemsPerPage);

    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % basket.products.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <PromoBlock basket={basket}/>
            <div className={s.wrapper}>
                {currentItems.map((item) => (
                    <div className={s.card} key={item.key.id + item.key.rating}>
                        <FullCard product={item.key} count={item.value}/>
                    </div>
                ))
                }
            </div>
            <ReactPaginate
                activeClassName={`${s.item} ${s.active}`}
                breakClassName={`${s.item} ${s.breakMe}`}
                breakLabel={'...'}
                containerClassName={s.pagination}
                disabledClassName={s.disabledPage}
                marginPagesDisplayed={2}
                nextClassName={`${s.item} ${s.next}`}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageClassName={`${s.item} ${s.paginationPage}`}
                pageRangeDisplayed={5}
                previousClassName={`${s.item} ${s.previous}`}
                renderOnZeroPageCount={undefined}
            />
        </>
    );
}

