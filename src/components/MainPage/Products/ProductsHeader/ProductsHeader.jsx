import s from './ProductsHeader.module.css';

export const ProductsHeader = () => {
  return (
    <div className={s.headersWrapper}>
      <select>
        <option>Sort by price ASC</option>
        <option>Sort by price DESC</option>
        <option>Sort by rating ASC</option>
        <option>Sort by rating DESC</option>
        <option>Sort by Discount ASC</option>
        <option>Sort by discount DESC</option>
      </select>
      <p>Found:<span>100</span></p>
      <form action="" method="get">
        <input name="s" placeholder="Search product" type="search" />
      </form>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/128/3917/3917658.png" alt="icon1"  className={s.icon} />
        <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917618.svg?token=exp=1671183816~hmac=b396c15d21b848830abe28426384c220" alt="icon2" className={s.icon} />
      </div>
      
    </div>
  )
}