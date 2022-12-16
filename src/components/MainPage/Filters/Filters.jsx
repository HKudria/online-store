import s from './Filters.module.css';
import { Button } from './Button/Button.tsx';
import { FilterBlock } from './FilterBlock/FilterBlock';
import { RangeBlock } from './RangeBlock/RangeBlock.tsx';



export const Filters = () => {
  return (
    <div className={s.filterContent}>
      <div className={s.buttonsWrapper}>
        <Button name="Reset Filters" />
        <Button name="Copy Link" />
      </div>
      <div className={s.filtersWrapper}>
        <FilterBlock title="Category" />
        <FilterBlock title="Brand" />
        <RangeBlock title="Price" from="€10.00" to="€1749.00" />
        <RangeBlock title="Stock" from="2" to="150" />
      </div>
    </div>
  )
}