import s from './Button.module.css';

interface IProps {
  name: string;
}

export const Button = (props: IProps) => {
  return (
    <button className={s.button}>
      { props.name }
    </button>
  )
}           