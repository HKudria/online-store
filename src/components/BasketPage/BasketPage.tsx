import s from 'BasketPage.module.css';
import { Form } from '../FormForPurchase/Form';


export const BasketPage = () => {
  const parametr = window.location.href.slice(window.location.href.indexOf('=') + 1);
  
  return (
    <div>
      Basket Page
      { parametr === 'modal' &&  <Form />}
    </div>
  )
}