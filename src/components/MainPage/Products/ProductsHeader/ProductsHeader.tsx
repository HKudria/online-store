import s from './ProductsHeader.module.scss';
import layout1 from '../../../../assets/image/layout_1.png';
import layout2 from '../../../../assets/image/layout_2.png';
import {ProductsCardSizeEnum} from '../Products';

interface IProductHeaderProps{
    count: number
    sort: (value: string) => void
    view: (value: string) => void
    filter: (value: string) => void
}

export const ProductsHeader = ({count, sort, view, filter}: IProductHeaderProps) => {
  return (
    <div className={s.headersWrapper}>
      <select onChange={(value)=>sort(value.currentTarget.value)}>
        <option>Select sort options</option>
        <option value="asc.price">Sort by price ASC</option>
        <option value="desc.price">Sort by price DESC</option>
        <option value="asc.rating">Sort by rating ASC</option>
        <option value="desc.rating">Sort by rating DESC</option>
        <option value="asc.discountPercentage">Sort by Discount ASC</option>
        <option value="desc.discountPercentage">Sort by discount DESC</option>
      </select>
      <p>Found:<span>{count}</span></p>
      <input name="s" placeholder="Search product" type="search" onChange={(value)=>filter(value.currentTarget.value)} />
      <div>
        <img src={layout1} alt="icon1" className={s.icon} onClick={()=>view(ProductsCardSizeEnum.Full)}/>
        <img src={layout2} alt="icon2" className={s.icon} onClick={()=>view(ProductsCardSizeEnum.Small)}/>
      </div>
    </div>
  )
}