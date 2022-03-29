import styles from './styles.module.scss';

const Input = ({ type, placeholder, className, style, width }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        placeholder={placeholder}
        type={type}
        className={`${!!className ? className : ''} `}
      />
    </div>
  );
};

export default Input;
