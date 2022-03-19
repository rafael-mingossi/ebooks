import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerH1Wrapper}>
        <span className={styles.allLib}>All Library</span>
        <span className={styles.cloud}>Cloud-based Learning Platform</span>
      </div>
    </div>
  );
};

export default Header;
