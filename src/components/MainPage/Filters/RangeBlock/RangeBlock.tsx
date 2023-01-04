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
        <p>0 | {isFinite(from) ? from : 0 }</p>
        <p>⟷</p>
        <p>
          {isFinite(to) ? to : initMax} | {initMax}
        </p>
      </div>
      <div className={s.rangeSliderWrapper}><RangeSlider min={from} max={to} onChange={onChange} initMax={initMax}/></div>
    </div>
  );
};
