import { ChangeEvent, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css'

import s from './CreditCard.module.css';

export const PaymentForm = () => {
  const [name, setName] = useState<string>('');
  const [focus, setFocus] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const updateValue = e.target.name;
    setFocus(updateValue);
  }
  
  const handleInputChangeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g,'');
    setCardNumber(e.target.value);
  }

  const handleInputChangeExpiry = (e: ChangeEvent<HTMLInputElement>) => {
    const month = e.target.value[0] + e.target.value[1];
    const day = e.target.value[2] + e.target.value[3];
    
    e.target.value = e.target.value.replace(/\D/g,'');

    if (+month > 12) {
      e.target.value = e.target.value.replace(month,'');
    }
    if (+day > 31) {
      e.target.value = e.target.value.replace(day,'');
    }

    setExpiry(e.target.value);
  }

  const handleInputChangeCVC = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g,'');
    setCvc(e.target.value);
  }
    return (
      <div id="PaymentForm">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={cardNumber}
        />
        <form className={s.paymentFormWrapper}>
          <input 
            className={s.inputField}
            type="text"
            maxLength={16}
            name="number"
            placeholder="Card Number"
            onChange={handleInputChangeCardNumber}
            value={cardNumber}
            onFocus={handleInputFocus}
          />

          <input
            className={s.inputField}
            type="text"
            name="expiry"
            placeholder="Expiry"
            maxLength={4}
            value={expiry}
            onChange={handleInputChangeExpiry}
            onFocus={handleInputFocus}
          />

          <input
            className={s.inputField}
            type="text"
            name="cvc"
            placeholder="cvc"
            maxLength={3}
            value={cvc}
            onChange={handleInputChangeCVC}
            onFocus={handleInputFocus}
          />
        </form>
      </div>
    );
}