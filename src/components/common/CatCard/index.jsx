import styles from './styles.module.scss';
import Link from 'next/link';

const CatCard = ({ img1, img2, img3, title, link }) => {
  return (
    <Link href={link || ''}>
      <div className={styles.catCartWrapper}>
        <div className={styles.imgWrapper}>
          <img src={img1} alt='book image' className={styles.img}></img>
          <img src={img2} alt='book image' className={styles.img}></img>
          <img src={img3} alt='book image' className={styles.img}></img>
        </div>
        <p>{title || ''}</p>
      </div>
    </Link>
  );
};

export default CatCard;
