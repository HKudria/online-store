import s from './RangeBlock.module.css';
import { RangeSlider } from '../RangeSlider';

interface IRangeProps {
  title: string;
  from: number;
  to: number;
  onChange: (number: number[])=>void;
}

export const RangeBlock = ({title, from, to, onChange}: IRangeProps) => {
  return (
    <div className={s.rangeWrapper}>
      <h2 className={s.title}>{ title }</h2>
      <div className={s.diapason}>
        <p>{ from }</p>
        <p>⟷</p>
        <p>{ to }</p>
      </div>
      <div className={s.rangeSliderWrapper}>
        { RangeSlider(from, to, onChange) }
      </div>
      
    </div>
  )
}