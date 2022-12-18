import s from './Button.module.css';

interface IButtonProps {
  name: string;
  callback?: () => void
}

export const Button = (props: IButtonProps) => {
  return (
    <button className={s.button} onClick={props.callback}>
      { props.name }
    </button>
  )
}           