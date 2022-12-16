import s from './Button.module.css';

interface IButtonProps {
  name: string;
}

export const Button = (props: IButtonProps) => {
  return (
    <button className={s.button}>
      { props.name }
    </button>
  )
}           