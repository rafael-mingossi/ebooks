import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const MainHeader = ({ user }) => {
  const router = useRouter();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imgs}>
        <img src='/logo.png' className={styles.img} />
      </div>
      <h1>ALL-LIBRARY</h1>
      <div className={styles.right} onClick={router.push('/account/profile')}>
        <p>Hello, {user?.firstName || 'Guest'}!</p>
        <img src='/user.svg' className={styles.user} />
      </div>
    </div>
  );
};

export default MainHeader;
