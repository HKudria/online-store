import s from './Basket.module.css';

export const Basket = () => {
  return (
    <div className={s.basketWrapper}>
      <img className={s.basketImage} src="https://cdn-icons-png.flaticon.com/512/1062/1062974.png" alt="basket" />
      <div className={s.amount}>1</div>
    </div>
  )
}