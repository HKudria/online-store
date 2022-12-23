import s from './Form.module.css';
import { useState, useEffect } from 'react';
import PaymentForm from './CreditCard/CreditCard';

export const Form = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [nameDirty, setNameDirty] = useState<boolean>(false);
  const [phoneDirty, setPhoneDirty] = useState<boolean>(false);
  const [addressDirty, setAddressDirty] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('Email cannot be empty');
  const [nameError, setNameError] = useState<string>('Name cannot be empty');
  const [phoneError, setPhoneError] = useState<string>('Phone number cannot be empty');
  const [addressError, setAddressError] = useState<string>('Address cannot be empty');

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if ((nameError.length > 0) || (emailError.length > 0) || (phoneError.length > 0) || (addressError.length > 0)) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, phoneError, addressError]);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(String(e.target.value).toLowerCase())) {
    setEmailError('Incorrect email');
  } else {
    setEmailError('');
  }
};

const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

const addressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className={s.container}>
      <div className={s.formWrapper}>
      
      <form className={s.form}>
      <h2 className={s.title}>Personal details</h2>
      {(nameDirty && (nameError.length > 0)) && <div className={s.error}>{nameError}</div>}
      <input value={name} 
      onChange={nameHandler}
      onBlur={blurHandler}
      type='text'
      name='name' 
      placeholder='Name'
      className={s.inputField} />

    {(phoneDirty && (phoneError.length > 0)) && <div className={s.error}>{phoneError}</div>}
     <input value={phone} 
     onBlur={blurHandler}
     onChange={phoneHandler}
     type='text' 
     name='phone' 
     placeholder='Phone'
     className={s.inputField}/>

      {(emailDirty && (emailError.length > 0)) && <div className={s.error}>{emailError}</div>}
      <input 
      value={email} 
      onChange={emailHandler} 
      onBlur={blurHandler} 
      type='text'
      name='email' 
      placeholder='Email'
      className={s.inputField} />

      {(addressDirty && (addressError.length > 0)) && <div className={s.error}>{addressError}</div>}
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
    </div>
  )
}