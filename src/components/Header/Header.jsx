import s from './Header.module.css';
import { Basket } from './Basket/Basket';
import logo from '../../assets/image/logo.png'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logoWrapper}>
        <img className={s.logo} alt="logo" src={logo}></img>
        <h1>Online Store</h1>
      </div>
        
        <p className={s.totalCard}>Card Total:<span>€0</span></p>
        <Basket />
    </header>
  )
}