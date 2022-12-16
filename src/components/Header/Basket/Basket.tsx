import s from './Basket.module.css';
import basket from '../../../assets/image/basket.png';

export const Basket = () => {
  return (
    <div className={s.basketWrapper}>
      <img className={s.basketImage} src={basket} alt="basket" />
      <div className={s.amount}>1</div>
    </div>
  )
}