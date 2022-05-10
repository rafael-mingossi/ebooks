import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SingleBookPage = ({ book }) => {
  const router = useRouter();
  //console.log('com -->', book);
  return (
    <div className={styles.bookContainer}>
      <div className={styles.bookWrapper}>
        <div className={styles.left}>
          <img src={book?.image} className={styles.img} />
        </div>
        <div className={styles.right}>
          <h1>{book?.title || ''}</h1>
          <p>{book?.subtitle || ''}</p>
          <div className={styles.line} />
          <p>
            <strong>Description:</strong> {book?.desc || ''}
          </p>
          <div className={styles.line} />
          <div className={styles.sections}>
            <div className={styles.divLeft}>
              <p>
                <strong>ISBN:</strong> {book?.isbn13 || ''}
              </p>
              <p>
                <strong>Total Pages:</strong> {book?.pages || ''}
              </p>
              <p>
                <strong>Language:</strong> {book?.language || ''}
              </p>
            </div>
            <div className={styles.divRight}>
              <p>
                <strong>Authors:</strong> {book?.authors || ''}
              </p>
              <p>
                <strong>Rating:</strong> {book?.rating || ''}
              </p>
              <p>
                <strong>Year:</strong> {book?.year || ''}
              </p>
            </div>
          </div>

          <div className={styles.line} />
          <div className={styles.btnDiv}>
            <div className={styles.btnWrapper}>
              <a
                href='/Book.pdf'
                download={book?.title}
                className={styles.learnMoreBtn}
              >
                Download
              </a>
            </div>
            <Link href='/Home'>
              <div className={styles.btnWrapper}>
                <a className={styles.learnMoreBtn}>Return</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
