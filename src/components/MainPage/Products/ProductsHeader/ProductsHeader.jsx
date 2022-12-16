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
        <img src="./layout_1.png" alt="icon1"  className={s.icon} />
        <img src="./layout_2.png" alt="icon2" className={s.icon} />
      </div>
      
    </div>
  )
}