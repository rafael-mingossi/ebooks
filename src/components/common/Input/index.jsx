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
  name,
  pattern,
  title,
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
        name={name}
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
