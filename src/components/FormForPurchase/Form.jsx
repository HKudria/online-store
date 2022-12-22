import s from './Form.module.css';
import { useState, useEffect } from 'react';
import PaymentForm from './CreditCard/CreditCard';



export const Form = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()

  const [emailDirty, setEmailDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [addressDirty, setAddressDirty] = useState(false);

  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [nameError, setNameError] = useState('Name cannot be empty');
  const [phoneError, setPhoneError] = useState('Phone number cannot be empty');
  const [addressError, setAddressError] = useState('Address cannot be empty');

  

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || emailError || phoneError || addressError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, phoneError, addressError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    const nameAndSurname = e.target.value;
    const arrayOfNameAndSurname = nameAndSurname.split(' ');
    if (arrayOfNameAndSurname.length >= 2) {
      if (arrayOfNameAndSurname.some(item => item.length < 3)) {
        setNameError('Incorrect name and surname');
      } else {
        setNameError('');
      }
    } else {
      setNameError('Incorrect name and surname');
    }
  } 

const emailHandler = (e) => {
  setEmail(e.target.value);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(String(e.target.value).toLowerCase())) {
    setEmailError('Incorrect email');
  } else {
    setEmailError('');
  }
};

const phoneHandler = (e) => {
  setPhone(e.target.value);
  const phoneNumber = e.target.value;
  if (phoneNumber[0] === '+' && phoneNumber.length > 9) {
    for (let i = 1; i < phoneNumber.length; i++) {
      if (phoneNumber[i].charCodeAt(0) < 48 || phoneNumber[i].charCodeAt(0) > 57) {
        setPhoneError('Incorrect phone number');
      } else {
        setPhoneError('');
      }
    }
  } else {
    setPhoneError('Incorrect phone number');
  }
}

const addressHandler = (e) => {
  setAddress(e.target.value);
  const addressStr = e.target.value;
  const addressArray = addressStr.split(' ');
  if (addressArray.length >= 3) {
    if (addressArray.some(item => item.length < 5)) {
      setAddressError('Incorrect address');
    } else {
      setAddressError('');
    }
} else {
  setAddressError('Incorrect address');
}
}
  


  const blurHandler = (e) => {
    if (e.target.name === 'email') {
      setEmailDirty(true);
    } else if (e.target.name === 'name') {
      setNameDirty(true);
    } else if (e.target.name === 'phone') {
      setPhoneDirty(true);
    } else if (e.target.name === 'address') {
      setAddressDirty(true);
    }
  }

  return (
    <div className={s.formWrapper}>
      
      <form className={s.form}>
      <h2 className={s.title}>Personal details</h2>
      {(nameDirty && nameError) && <div className={s.error}>{nameError}</div>}
      <input value={name} 
      onChange={nameHandler}
      onBlur={blurHandler}
      type='text'
      name='name' 
      placeholder='Name'
      className={s.inputField} />

    {(phoneDirty && phoneError) && <div className={s.error}>{phoneError}</div>}
     <input value={phone} 
     onBlur={blurHandler}
     onChange={phoneHandler}
     type='text' 
     name='phone' 
     placeholder='Phone'
     className={s.inputField}/>

      {(emailDirty && emailError) && <div className={s.error}>{emailError}</div>}
      <input 
      value={email} 
      onChange={emailHandler} 
      onBlur={blurHandler} 
      type='text'
      name='email' 
      placeholder='Email'
      className={s.inputField} />

      {(addressDirty && addressError) && <div className={s.error}>{addressError}</div>}
      <input 
      value={address} 
      onChange={addressHandler} 
      onBlur={blurHandler} 
      type='text'
      name='address' 
      placeholder='Address'
      className={s.inputField} />

      <h2 className={s.title}>Credit card details</h2>
      <PaymentForm />

      <button className={s.bntSubmit} disabled={!formValid} type='submit'>Confirm</button>
    </form>
    </div>
    
  )
}