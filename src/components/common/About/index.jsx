import styles from './styles.module.scss';
import Feature from '../Feature';

const About = () => {
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.txtWrapper}>
        <h2 className={styles.h2Heading}>get to know about all-library</h2>
      </div>
      <div className={styles.gridWrapper}>
        <div>
          <h3 className={styles.h3Heading}>
            Thousands of titles from a huge variety of topics
          </h3>
          <p className={styles.paragraphs}>
            The biggest collection of e-books on the internet, the better
            collections and titles in one single place, making your readings
            happening anywhere and at anytime!
          </p>
          <h3 className={styles.h3Heading}>
            The new concept of online reading in one place
          </h3>
          <p className={styles.paragraphs}>
            All-Library was built with the purpose of making the online readings
            and research easier to students and book lovers, thousands of titles
            gathered in one place having a great search engine to facilitate the
            searchs!
          </p>
          <div className={styles.btnWrapper}>
            <a href='#' className={styles.learnMoreBtn}>
              Learn More &rarr;
            </a>
          </div>
        </div>
        <div className={styles.imagesWrapper}>
          <img
            src='/cover1.png'
            alt='Image Book Cover 1'
            className={styles.booksImgs}
          />
          <img
            src='/cover4.jpeg'
            alt='Image Book Cover 2'
            className={styles.booksImgs}
          />
          <img
            src='/cover5.jpeg'
            alt='Image Book Cover 3'
            className={styles.booksImgs}
          />
        </div>
      </div>
      <Feature />
    </div>
  );
};

export default About;
