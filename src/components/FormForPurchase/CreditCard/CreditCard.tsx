import s from './CreditCard.module.css';
import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css'

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    value: '',
  };

  handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });

    e.target.value = e.target.value.replace(/\D/g,'');
  }

  handleInputChangeExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const month = e.target.value[0] + e.target.value[1];
    const day = e.target.value[2] + e.target.value[3];
    
    this.setState({ [name]: value });

    e.target.value = e.target.value.replace(/\D/g,'');

    if (+month > 12) {
      e.target.value = e.target.value.replace(month,'');
    }
    if (+day > 31) {
      e.target.value = e.target.value.replace(day,'');
    }
  }

  handleInputChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });

    e.target.value = e.target.value.replace(/\D/g,'');
  }
  
  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form className={s.paymentFormWrapper}>
          <input 
            className={s.inputField}
            type="text"
            maxLength={16}
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChangeCardNumber}
            onFocus={this.handleInputFocus}
          />

          <input
            className={s.inputField}
            type="text"
            name="expiry"
            placeholder="Expiry"
            maxLength={4}
            onChange={this.handleInputChangeExpiry}
            onFocus={this.handleInputFocus}
          />

          <input
            className={s.inputField}
            type="text"
            name="cvc"
            placeholder="cvc"
            maxLength={3}
            onChange={this.handleInputChangeCVC}
            onFocus={this.handleInputFocus}
          />
        </form>
      </div>
    );
  }
}