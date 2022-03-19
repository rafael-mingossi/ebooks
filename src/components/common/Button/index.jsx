import styles from './styles.module.scss';

const Button = ({ label, onclick }) => {
  return (
    <div className={styles.textbox} onClick={onclick}>
      <a href='#' className={styles.btnWhite}>
        {label}
      </a>
    </div>
  );
};

export default Button;
