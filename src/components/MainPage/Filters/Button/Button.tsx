import s from './Button.module.css';

interface IButtonProps {
  name: string;
  callback?: () => void;
}

export const Button = ({ name, callback }: IButtonProps) => {
  return (
    <button className={s.button} onClick={callback}>
      {name}
    </button>
  );
};
