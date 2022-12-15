import s from './Header.module.css';
import { Basket } from './Basket/Basket';

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logoWrapper}>
        <img className={s.logo} alt="logo" src="https://cdn-icons-png.flaticon.com/512/869/869432.png"></img>
        <h1>Online Store</h1>
      </div>
        
        <p>Card Total:<span>€0</span></p>
        <Basket />
    </header>
  )
}