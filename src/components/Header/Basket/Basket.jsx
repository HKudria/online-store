import s from './Basket.module.css';

export const Basket = () => {
  return (
    <div className={s.basketWrapper}>
      <img className={s.basketImage} src="./basket.png" alt="basket" />
      <div className={s.amount}>1</div>
    </div>
  )
}