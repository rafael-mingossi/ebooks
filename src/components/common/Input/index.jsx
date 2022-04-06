import styles from './styles.module.scss';

const Input = ({ type, placeholder, className, id, required, label }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        placeholder={placeholder}
        type={type}
        className={`${!!className ? className : styles.inputs} `}
        required={required}
        id={id}
      />
      <label
        htmlFor={id}
        className={`${!!className ? className : styles.labels} `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
