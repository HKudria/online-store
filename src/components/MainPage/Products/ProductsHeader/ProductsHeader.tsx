import s from './ProductsHeader.module.scss';
import layout1 from '../../../../assets/image/layout_1.png';
import layout2 from '../../../../assets/image/layout_2.png';
import {ProductsCardSizeEnum} from '../Products';

interface IProductHeaderProps{
    count: number
    sort: (value: string) => void
    view: (value: string) => void
}

export const ProductsHeader = (props: IProductHeaderProps) => {
  return (
    <div className={s.headersWrapper}>
      <select onChange={(value)=>props.sort(value.currentTarget.value)}>
        <option>Select sort options</option>
        <option value="a.price">Sort by price ASC</option>
        <option value="d.price">Sort by price DESC</option>
        <option value="a.rating">Sort by rating ASC</option>
        <option value="d.rating">Sort by rating DESC</option>
        <option value="a.discountPercentage">Sort by Discount ASC</option>
        <option value="d.discountPercentage">Sort by discount DESC</option>
      </select>
      <p>Found:<span>{props.count}</span></p>
      <form action="" method="get">
        <input name="s" placeholder="Search product" type="search" />
      </form>
      <div>
        <img src={layout1} alt="icon1" className={s.icon} onClick={()=>props.view(ProductsCardSizeEnum.Full)}/>
        <img src={layout2} alt="icon2" className={s.icon} onClick={()=>props.view(ProductsCardSizeEnum.Small)}/>
      </div>
    </div>
  )
}