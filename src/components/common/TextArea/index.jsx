import styles from './styles.module.scss';

const TextArea = ({
  placeholder,
  type,
  className,
  required,
  onChange,
  value,
  id,
  label,
  name,
  rows,
  cols,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <textarea
        placeholder={placeholder}
        type={type}
        className={`${!!className ? className : styles.inputs} `}
        required={required}
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        rows={rows}
        cols={cols}
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

export default TextArea;
