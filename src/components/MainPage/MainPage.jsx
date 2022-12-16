import s from './MainPage.module.css';
import { Filters } from './Filters/Filters.jsx';
import { Products } from './Products/Products';

export const MainPage = () => {
  return (
    <div className={s.wrapper}>
      <Filters />
      <Products />
    </div>
  )
}