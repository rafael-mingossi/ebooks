import styles from './styles.module.scss';

const BookCard = ({ img, title, onClick }) => {
  return (
    <div className={styles.bookWrapper} onClick={onClick}>
      <img src={img} className={styles.img} />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default BookCard;
