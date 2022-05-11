import styles from './styles.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.left}>
        <Link href='/faq'>
          <p>FAQ</p>
        </Link>
        <Link href='/help'>
          <p>Help</p>
        </Link>
        <Link href='/privacy'>
          <p>Privacy</p>
        </Link>
        <Link href='/disclaimer'>
          <p>Disclaimer</p>
        </Link>
      </div>
      <div className={styles.middle}>
        <img src='/logo.png' className={styles.img} />
      </div>
      <div className={styles.right}>
        <p>
          All the information contained in this wesite is used for educational
          purposes only
        </p>
      </div>
    </div>
  );
};

export default Footer;
