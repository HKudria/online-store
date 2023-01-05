import s from './CreditCard.module.css';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css'
import { useState } from 'react';

export const PaymentForm = () => {
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateValue = e.target.name;
    setFocus(updateValue);
  }
  
  const handleInputChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(value);
    e.target.value = e.target.value.replace(/\D/g,'');
  }

  const handleInputChangeExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const month = e.target.value[0] + e.target.value[1];
    const day = e.target.value[2] + e.target.value[3];
    
    setExpiry(value);

    e.target.value = e.target.value.replace(/\D/g,'');

    if (+month > 12) {
      e.target.value = e.target.value.replace(month,'');
    }
    if (+day > 31) {
      e.target.value = e.target.value.replace(day,'');
    }
  }

  const handleInputChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setCvc(value);

    e.target.value = e.target.value.replace(/\D/g,'');
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
            onFocus={handleInputFocus}
          />

          <input
            className={s.inputField}
            type="text"
            name="expiry"
            placeholder="Expiry"
            maxLength={4}
            onChange={handleInputChangeExpiry}
            onFocus={handleInputFocus}
          />

          <input
            className={s.inputField}
            type="text"
            name="cvc"
            placeholder="cvc"
            maxLength={3}
            onChange={handleInputChangeCVC}
            onFocus={handleInputFocus}
          />
        </form>
      </div>
    );
}