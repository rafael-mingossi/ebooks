import styles from './styles.module.scss';

const PageHeader = ({ title }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default PageHeader;
