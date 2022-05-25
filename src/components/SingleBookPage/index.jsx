import styles from './styles.module.scss';
import { useRouter, useState } from 'next/router';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

const SingleBookPage = ({ book }) => {
  const router = useRouter();
  //const [rating, setRating] = useState('');

  const handleRating = (rate) => {
    //setRating(rate);
    // Some logic
  };

  return (
    <div className={styles.bookContainer}>
      <div className={styles.bookWrapper}>
        <div className={styles.left}>
          <img
            src={book?.image || book?.cover}
            alt='book image'
            className={styles.img}
          />
        </div>
        <div className={styles.right}>
          <h1>{book?.title || ''}</h1>
          <p>{book?.subtitle || `${book?.category} category`}</p>
          <div className={styles.line} />
          <p>
            <strong>Description:</strong> {book?.desc || book?.description}
          </p>
          <div className={styles.line} />
          <div className={styles.sections}>
            <div className={styles.divLeft}>
              <p>
                <strong>ISBN:</strong> {book?.isbn13 || book?.bookId}
              </p>
              <p>
                <strong>Total Pages:</strong> {book?.pages || book?.totalPages}
              </p>
              <p>
                <strong>Language:</strong> {book?.language || ''}
              </p>
            </div>
            <div className={styles.divRight}>
              <p>
                <strong>Authors:</strong> {book?.authors || ''}
              </p>
              <div className={styles.rating}>
                <p>
                  <strong>Rating:</strong>
                </p>
                <div className={styles.rate}>
                  <Rating
                    onClick={() => handleRating}
                    ratingValue={0}
                    size={20}
                    label
                    transition
                    fillColor='orange'
                    emptyColor='gray'
                    className='foo' // Will remove the inline style if applied
                  />
                </div>
              </div>

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
