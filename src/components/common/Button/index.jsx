import styles from './styles.module.scss';

const Button = ({ label, onClick }) => {
  return (
    <div className={styles.textbox} onClick={onClick}>
      <div className={styles.btnWhite}>{label}</div>
    </div>
  );
};

export default Button;
