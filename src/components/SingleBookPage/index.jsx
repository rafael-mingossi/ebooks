import styles from './styles.module.scss';
import { MainHeader } from '/src/components';

const SingleBookPage = ({ book }) => {
  //console.log('com -->', book);
  return (
    <div className={styles.bookContainer}>
      <MainHeader />
      <div className={styles.bookWrapper}>
        {book?.map((book) => (
          <>
            <div className={styles.left}>
              <img src={book.image} className={styles.img} />
            </div>
            <div className={styles.right}>
              <h1>{book.title}</h1>
              <p>{book.subtitle}</p>
              <p>{book.isbn13}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SingleBookPage;
