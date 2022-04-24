import styles from './styles.module.scss';

const Button = ({ label, onClick, disabled }) => {
  return (
    <div className={styles.textbox} onClick={onClick}>
      <button className={styles.btnWhite} disabled={disabled}>
        {label}
      </button>
    </div>
  );
};

export default Button;
