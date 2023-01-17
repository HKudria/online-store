import {useState, useEffect} from 'react';

import {addDiscount, removeDiscount} from '../../../redux/basket/basketSlice';
import {BasketState, IDiscount} from '../../../redux/basket/BasketInterface';
import {useAppDispatch} from '../../../redux/hooks';

import {Button} from '../../MainPage/Filters/Button/Button';
import { Form } from '../../FormForPurchase/Form';
import { useQuery } from '../../Helper/QueryParser';

import s from './PromoBlock.module.css';


interface IPromoBlockProps {
    basket: BasketState
}

export const PromoBlock = ({basket}: IPromoBlockProps) => {
    const percent10 = ['ten1', 'ten2', 'ten3'];
    const percent20 = ['twenty', 'twenty1', 'twenty2'];
    const [disInput, setDisInput] = useState<string>('')
    const dispatch = useAppDispatch();
    const [show, setShow] = useState<boolean>(false);
    const query = useQuery();
    const parameter = query.get('page');
    
    const applyDiscount = () => {
        const dis: IDiscount = {
            key: 'unknown',
            value: 0
        }
        if (percent10.includes(disInput)) {
            dis.value = 10
            dis.key = disInput
        } else if (percent20.includes(disInput)) {
            dis.value = 20
            dis.key = disInput
        }
        dispatch(addDiscount(dis))
        setDisInput('')
    }

    useEffect(() => {
        if (parameter === 'modal') {
            setShow(true)
        }
    }, [parameter])

    return (
        <div className={s.wrapper}>
            {show && <Form onClose={() => setShow(false)}/>}
            <h2 className={s.title}>Summary</h2>
                <div className={s.totalProducts}>
                    Products:  
                    <span className={s.amountProducts}> 
                        {basket.products.reduce((acc, prod) => {
                        acc += prod.value
                        return acc;
                    }, 0)}
                    </span>
                </div>

               <div className={s.totalPrice}>
                    Price:
                   {basket.discount.length !== 0 ?
                       <><s>{basket.totalAmount}</s> <b className={s.price}>{basket.discountAmount}</b></> :
                       <><span className={s.price}> {basket.totalAmount}</span><span className={s.price}>€</span></> }
              </div>


            <div className={s.discounts}>
                Discounts:
                <br></br>
                10%: 
                <span className={s.promoCode}>
                    {percent10.map(el => (el + ' '))}
                </span>
                <br></br>
                20%: 
                <span className={s.promoCode}>
                    {percent20.map(el => (el + ' '))}
                </span>
                
            </div>
           
          <div className={s.addPromoCode}>
            <input
                    className={s.inputPromo}
                    name='discount'
                    placeholder='Enter promo code'
                    type='text'
                    value={disInput}
                    onChange={(event) => setDisInput(event.currentTarget.value)}
                />
                <Button name={'Apply discount'} callback={applyDiscount}/>
          </div>
            <div className={s.dropDiscount}>
                {basket.discount.map(dis => {
                    return (<div className={s.promoCode} key={dis.key}>
                        <div className={s.promoWrapper}>
                            <div className={s.promoCodeItem}>{dis.key}</div>
                            <Button name={'Drop discount'} callback={() => dispatch(removeDiscount(dis))}/>
                        </div>
                    </div>)
                })}
            </div>
           
            <button className={s.btn} onClick={() => setShow(true)}>Buy now</button>
        </div>
    )
}