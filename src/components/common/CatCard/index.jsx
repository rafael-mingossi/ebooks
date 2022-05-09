import styles from './styles.module.scss';

const CatCard = ({ img1, img2, img3 }) => {
  return (
    <div className={styles.catCartWrapper}>
      <div className={styles.imgWrapper}>
        <img src={img1} className={styles.img}></img>
        <img src={img2} className={styles.img}></img>
        <img src={img3} className={styles.img}></img>
      </div>
      <p>CSS</p>
    </div>
  );
};

export default CatCard;
