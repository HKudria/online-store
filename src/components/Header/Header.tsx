import {useEffect, useState} from 'react';

import {useAppSelector} from '../../redux/hooks';
import {getBasketState} from '../../redux/basket/basketSlice';
import logo from '../../assets/image/logo.png';

import { Basket } from './Basket/Basket';
import s from './Header.module.css';

export const Header = () => {
    const basket = useAppSelector(getBasketState);
    const [amount, setAmount] = useState<number>(0)
    const [productCount, setProductCount] = useState<number>(0)

    useEffect(() => {
       if(basket.discount.length === 0){
           setAmount(basket.totalAmount)
       } else {
           setAmount(basket.discountAmount)
       }
       setProductCount(basket.products.reduce((acc, prod)=>{
           acc += prod.value
           return acc;
       },0))
    }, [basket.discount, basket.products]);
  return (
    <header className={s.header}>
      <a href='/' className={s.logoWrapper}>
          <img className={s.logo} alt='logo' src={logo}></img>
      </a>
      <p className={s.totalCard}>
        Card Total: <span>{amount}€</span>
      </p>
      <Basket count={productCount}/>
    </header>
  );
};
