import s from './Form.module.css';
import { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState()

  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);

  const [emailError, setEmailError] = useState('Емейл не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [nameError, setNameError] = useState('Имя и фамилия не может быть пустым');

  

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл');
    } else {
      setEmailError('');
    }
};

const passwordHandler = (e) => {
  setPassword(e.target.value);
  if (e.target.value.length < 3 || e.target.value.length > 8 ) {
    setPasswordError('Пароль должен быть длиннее 3 и меньше 8');
  } else if (!e.target.value) {
    setPasswordError('Пароль не может быть пустым');
  } else {
    setPasswordError('');
  }
}

const nameHandler = (e) => {
  setName(e.target.value);
  const nameAndSurname = e.target.value;
  const arrayOfNameAndSurname = nameAndSurname.split(' ');
  console.log(arrayOfNameAndSurname);
  if (arrayOfNameAndSurname.length < 2) {
    setNameError('Введите полное имя и фамилию');
  } else {
    for (let i = 0; i < arrayOfNameAndSurname.length; i++) {
      if (arrayOfNameAndSurname[i].length < 3) {
        setNameError('Введите полное имя и фамилию');
      } else {
        setNameError('');
      }
    } 
  } 
}
  


  const blurHandler = (e) => {
    if (e.target.name === 'email') {
      setEmailDirty(true);
    } else if (e.target.name === 'password') {
      setPasswordDirty(true);
    } else if (e.target.name === 'name') {
      setNameDirty(true);
    }
  }

  return (
    <form>
      {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
      <input value={name} onChange={nameHandler} onBlur={blurHandler} type='text' name='name' placeholder='Enter your name and surname..' />

      <PhoneInput
      placeholder="Enter phone number"
      value={phone}
      defaultCountry="US"
      onChange={setPhone}/>

      {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
      <input value={email} onChange={emailHandler} onBlur={blurHandler} type='text' name='email' placeholder='Enter your email..' />

      {(passwordError && passwordDirty) && <div style={{color: 'red'}}>{passwordError}</div>}
      <input value={password} onChange={passwordHandler} onBlur={blurHandler} type='password' name='password' placeholder='Enter your password..' />

      <button disabled={!formValid} type='submit'>submit</button>
    </form>
  )
}