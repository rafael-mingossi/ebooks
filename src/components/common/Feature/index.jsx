import styles from './styles.module.scss';

const Feature = () => {
  return (
    <div className={styles.featureWrapper}>
      <div className={styles.singleBoxWrapper}>
        <div className={styles.front}>
          <div className={styles.frontImgWrapper}>
            <img
              src='/download.svg'
              alt='Download icon'
              className={styles.frontImg}
            />
          </div>
          <h2>DOWNLOADS</h2>
        </div>
        <div className={styles.back}>
          <img
            src='/download.svg'
            alt='Download icon'
            className={styles.featImg}
          />
          <h3 className={styles.header}>Download books</h3>
          <p className={styles.description}>
            You can download as many titles as you want and read them whenever
            you want!
            <br />
            <br />
            Just log in to your account and select the books you like by
            favouriting them!
          </p>
        </div>
      </div>
      <div className={styles.singleBoxWrapper}>
        <div className={styles.front}>
          <div className={styles.frontImgWrapper}>
            <img
              src='/book.svg'
              alt='Download icon'
              className={styles.frontImg}
            />
          </div>
          <h2>READ</h2>
        </div>
        <div className={styles.back}>
          <img src='/book.svg' alt='Book icon' className={styles.featImg} />
          <h3 className={styles.header}>Read online</h3>
          <p className={styles.description}>
            Read your collection online if you don`t want to download the books!
            <br />
            <br />
            Use the search bar engine to get the best out of your search!
          </p>
        </div>
      </div>
      <div className={styles.singleBoxWrapper}>
        <div className={styles.front}>
          <div className={styles.frontImgWrapper}>
            <img
              src='/pdf.svg'
              alt='Download icon'
              className={styles.frontImg}
            />
          </div>
          <h2>PDF</h2>
        </div>
        <div className={styles.back}>
          <img src='/pdf.svg' alt='Pdf icon' className={styles.featImg} />
          <h3 className={styles.header}>PDF formart</h3>
          <p className={styles.description}>
            Simple and practical, have your favourite titles in PDF format!
            <br />
            <br />
            Don`t want to read online, no worries! Get the PDF of the e-book and
            read later!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
