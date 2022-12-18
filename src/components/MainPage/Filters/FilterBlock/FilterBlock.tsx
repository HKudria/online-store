import s from './FilterBlock.module.css';

interface IFilterProps {
  title: string;
  data: string[]
  onChangeFn: (category: string) => void
}

export const FilterBlock = (props: IFilterProps) => {
  return (
      <div className={s.box}>
          <h2>{ props.title }</h2>
          <div className={s.checkboxField}>
              <div className={s.filterList}>
                  {props.data.map((element, index) => {
                      return (
                          <div className={s.filterListItem} key={`cat${index}${element}`}>
                              <input type="checkbox" id={element} onChange={(event)=>props.onChangeFn(event.currentTarget.id)}  />
                              <label htmlFor={element}>{element}</label>
                          </div>
                      )
                  })}
              </div>
          </div>
      </div>

  )
}