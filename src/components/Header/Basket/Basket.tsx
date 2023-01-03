import { NavLink } from 'react-router-dom';

import basket from '../../../assets/image/basket.png';

import s from './Basket.module.css';

interface IBasketProps{
    count: number
}

export const Basket = ({count}: IBasketProps) => {
  return (
    <div className={s.basketWrapper}>
      <NavLink to="/BasketPage">
        <img className={s.basketImage} src={basket} alt='basket' />
        <div className={s.amount}>{count}</div>
      </NavLink>
      
    </div>
  );
};
