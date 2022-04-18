import styles from './styles.module.scss';

const Button = ({ label, onClick }) => {
  return (
    <div className={styles.textbox} onClick={onClick}>
      <button className={styles.btnWhite}>{label}</button>
    </div>
  );
};

export default Button;
