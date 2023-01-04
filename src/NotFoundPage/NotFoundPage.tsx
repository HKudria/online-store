import { NavLink } from 'react-router-dom';
import image from '../assets/image/404-page.jpeg'
import s from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <img className={s.image} src={image} />
      <NavLink to='/'>
        <button className={s.button}>Retutn on main page</button>
      </NavLink>
    </div>
  )
}