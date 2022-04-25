import styles from './styles.module.scss';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

const MainHeader = ({ user }) => {
  const { handleLogout } = useLocalStorage();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imgs}>
        <img src='/logo.png' className={styles.img} />
      </div>
      <h1>ALL-LIBRARY</h1>
      <div className={styles.right} onClick={() => handleLogout()}>
        <p>Hello, {user?.firstName || 'Guest'}!</p>
        <img src='/user.svg' className={styles.user} />
      </div>
    </div>
  );
};

export default MainHeader;
