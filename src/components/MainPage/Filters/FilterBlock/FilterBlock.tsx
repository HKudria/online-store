import s from './FilterBlock.module.css';

interface IFilterProps {
  title: string;
}

export const FilterBlock = (props: IFilterProps) => {
  return (
    <div className={s.checkboxField}>
      <h2>{ props.title }</h2>
      <div className={s.filterList}>
        <div className={s.filterListItem}>
          <input type="checkbox" id='smartphones' />
          <label htmlFor="smartphones">smartphones</label>
          <span className={s.amount}>(1/1)</span>
        </div>
        <div className={s.filterListItem}>
          <input type="checkbox" id='smartphones' />
          <label htmlFor="smartphones">smartphones</label>
          <span className={s.amount}>(1/1)</span>
        </div>
        <div className={s.filterListItem}>
          <input type="checkbox" id='smartphones' />
          <label htmlFor="smartphones">smartphones</label>
          <span className={s.amount}>(1/1)</span>
        </div>
        
      </div>
    </div>
  )
}