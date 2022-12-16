import s from './ProductCard.module.css';
import { Button } from '../../Filters/Button/Button'

export const ProductCard = () => {
  return (
    <div className={s.cardWrapper}>
      <h3 className={s.title}>Iphone</h3>
      <ul className={s.description}>
        <li>Category: smartphones</li>
        <li>Brand: Apple</li>
        <li>Price: €549.00</li>
        <li>Discount: 12,96%</li>
        <li>Rating: 4,96</li>
        <li>Stock: 94</li>
      </ul>
      <div className={s.buttonsWrapper}>
        <Button name='App to card' />
        <Button name='Details' />
      </div>
      <img className={s.cardImg} src='./iphone.png' alt='iphone' />
    </div>
  )
}