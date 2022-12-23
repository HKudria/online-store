import s from './FilterBlock.module.css';

interface IFilterProps {
  title: string;
  data: string[];
  onChangeFn: (category: string) => void;
}

export const FilterBlock = ({ title, data, onChangeFn }: IFilterProps) => {
  return (
    <div className={s.box}>
      <h2>{title}</h2>
      <div className={s.checkboxField}>
        <div className={s.filterList}>
          {data.map((element, index) => (
            <div className={s.filterListItem} key={`cat${index}${element}`}>
              <input
                type='checkbox'
                id={element}
                onChange={(event) => onChangeFn(event.currentTarget.id)}
              />
              <label htmlFor={element}>{element}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
