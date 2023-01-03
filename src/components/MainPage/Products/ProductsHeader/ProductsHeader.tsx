import {useEffect} from 'react';

import s from './ProductsHeader.module.scss';

import {ProductsCardSizeEnum} from '../../MainPage';
import layout1 from '../../../../assets/image/layout_1.png';
import layout2 from '../../../../assets/image/layout_2.png';

interface IProductHeaderProps {
    count: number;
    sortType: string;
    sort: (value: string) => void;
    view: (value: string) => void;
    filter: (value: string) => void;
}

export const ProductsHeader = ({count, sort, view, filter, sortType}: IProductHeaderProps) => {
    useEffect(() => {
        if (sortType.length !== 0) {
            (document.getElementById('sortSelect') as HTMLOptionElement).value = sortType;
        }
    }, [sortType]);

    return (
        <div className={s.headersWrapper}>
            <select onChange={(value) => sort(value.currentTarget.value)} id='sortSelect'>
                <option>Select sort options</option>
                <option value='asc↑price'>Sort by price ASC</option>
                <option value='desc↑price'>Sort by price DESC</option>
                <option value='asc↑rating'>Sort by rating ASC</option>
                <option value='desc↑rating'>Sort by rating DESC</option>
                <option value='asc↑discountPercentage'>Sort by Discount ASC</option>
                <option value='desc↑discountPercentage'>Sort by discount DESC</option>
            </select>
            <p>
                Found:<span>{count}</span>
            </p>
            <input
                name='s'
                placeholder='Search product'
                type='search'
                onChange={(value) => filter(value.currentTarget.value)}
            />
            <div>
                <img
                    src={layout1}
                    alt='icon1'
                    className={s.icon}
                    onClick={() => view(ProductsCardSizeEnum.Full)}
                />
                <img
                    src={layout2}
                    alt='icon2'
                    className={s.icon}
                    onClick={() => view(ProductsCardSizeEnum.Small)}
                />
            </div>
        </div>
    );
};
