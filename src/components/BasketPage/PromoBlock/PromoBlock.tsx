import {useState} from 'react';

import {addDiscount, removeDiscount} from '../../../redux/basket/basketSlice';
import {BasketState, IDiscount} from '../../../redux/basket/BasketInterface';
import {useAppDispatch} from '../../../redux/hooks';
import {Button} from '../../MainPage/Filters/Button/Button';
import { Form } from '../../FormForPurchase/Form';
import s from './PromoBlock.module.css';

interface IPromoBlockProps {
    basket: BasketState
}

export const PromoBlock = ({basket}: IPromoBlockProps) => {
    const percent10 = ['ten1', 'ten2', 'ten3'];
    const percent20 = ['twenty', 'twenty1', 'twenty2'];
    const [disInput, setDisInput] = useState<string>('')
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    
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

    const renderPrice = () => {
        if (basket.discount.length !== 0) {
            return (
                <div>
                    Products: 
                    <s>{basket.totalAmount}</s> -- <b>{basket.discountAmount}</b>
                </div>
            )
        } else {
            return (
                <div>
                    Total: 
                    <b>{basket.totalAmount}</b>
                </div>
            )
        }
    }

    return (
        <div className={s.wrapper}>
            {show && <Form />}
            <h2 className={s.title}>Summary</h2>
            <div className={s.discounts}>
                Discount list:
                <br></br>
                10%: {percent10.map(el => (el + ' '))}
                <br></br>
                20%: {percent20.map(el => (el + ' '))}
                {renderPrice()}
                Total products: {basket.products.reduce((acc, prod) => {
                acc += prod.value
                return acc;
            }, 0)}
            </div>
           
          
            <input
                name='discount'
                placeholder='enter promo code'
                type='text'
                value={disInput}
                onChange={(event) => setDisInput(event.currentTarget.value)}
            />
            <Button name={'Apply discount'} callback={applyDiscount}/>
            {basket.discount.map(dis => {
                return (<div key={dis.key}>
                    {dis.key}
                    <Button name={'Drop discount'} callback={() => dispatch(removeDiscount(dis))}/>
                </div>)
            })}
            <button onClick={() => {
                if (show) {
                    setShow(false);
                } else {
                    setShow(true)
                }
            }}>Buy now</button>
        </div>

    )
}