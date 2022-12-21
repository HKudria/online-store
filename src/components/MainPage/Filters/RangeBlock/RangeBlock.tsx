import s from './RangeBlock.module.css';

import { RangeSlider } from '../RangeSlider';

interface IRangeProps {
  title: string;
  from: number;
  to: number;
  onChange: (number: number[]) => void;
  initMax: number;
}

export const RangeBlock = ({ title, from, to, onChange, initMax }: IRangeProps) => {
  return (
    <div className={s.rangeWrapper}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.diapason}>
        <p>0 | {from}</p>
        <p>⟷</p>
        <p>
          {to} | {initMax}
        </p>
      </div>
      <div className={s.rangeSliderWrapper}>{RangeSlider(from, to, onChange, initMax)}</div>
    </div>
  );
};
