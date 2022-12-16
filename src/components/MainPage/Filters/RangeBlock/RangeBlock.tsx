import s from './RangeBlock.module.css';
import { RangeSlider } from '../RangeSlider';

interface IRangeProps {
  title: string;
  from: string;
  to: string
}

export const RangeBlock = (props: IRangeProps) => {
  return (
    <div className={s.rangeWrapper}>
      <h2 className={s.title}>{ props.title }</h2>
      <div className={s.diapason}>
        <p>{ props.from }</p>
        <p>⟷</p>
        <p>{ props.to }</p>
      </div>
      <div className={s.rangeSliderWrapper}>
        { RangeSlider() }
      </div>
      
    </div>
  )
}