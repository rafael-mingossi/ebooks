import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MainHeader = ({ user }) => {
  const router = useRouter();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imgs}>
        <img src='/logo.png' alt='logo image' className={styles.img} />
      </div>
      <Link href={'/Home'}>
        <h1>ALL-LIBRARY</h1>
      </Link>
      <div className={styles.right}>
        <Link href={'/account/profile'}>
          <p>Hello, {user?.firstName || 'Guest'}!</p>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
