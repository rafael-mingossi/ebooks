import styles from './styles.module.scss';

const Input = ({
  placeholder,
  type,
  className,
  required,
  onChange,
  value,
  id,
  label,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        placeholder={placeholder}
        type={type}
        className={`${!!className ? className : styles.inputs} `}
        required={required}
        onChange={onChange}
        value={value}
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
