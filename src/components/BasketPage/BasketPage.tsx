import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getBasketState, initBasket} from '../../redux/basket/basketSlice';

import {FullCard} from '../MainPage/Products/ProductCard/FullCard/FullCard';
import {serializeQuery, useQuery} from '../Helper/QueryParser';

import {PromoBlock} from './PromoBlock/PromoBlock';
import s from './BasketPage.module.css';
import basket2 from '../../assets/image/basket2.png';

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
    const [itemOffset, setItemOffset] = useState<number>(0);
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
                        handlePageClick({selected: parseInt(data) > Math.ceil(basket.products.length / itemsPage) ? 0 : parseInt(data)})
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

    return (
        <>
           
            {basket.products.length === 0 ? <div className={s.empty}>
                <img className={s.basket} src={basket2} alt='basket' />
                <p>Basket is empty :(</p>
            </div> :
                <>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        {currentItems.map((item, index) => (
                            <div className={s.card} key={item.key.id + item.key.rating}>
                                <FullCard product={item.key} count={item.value} id={itemOffset + index + 1}/>
                            </div>
                        ))
                        }
                    </div>
                    <div className={s.promoContainer}>
                        <PromoBlock basket={basket}/>
                        <div className={s.itemsOnPage}>
                            Items per page: <input className={s.input} type={'number'} value={itemsPage} onChange={changePage}/>
                        </div>
                        
                    </div>
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
                        forcePage={pageNumber}
                        pageClassName={`${s.item} ${s.paginationPage}`}
                        pageRangeDisplayed={5}
                        previousClassName={`${s.item} ${s.previous}`}
                    />
                </>
            }
        </>
    );
}

