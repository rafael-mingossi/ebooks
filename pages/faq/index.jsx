import styles from './styles.module.scss';
import { useState } from 'react';
import { PageHeader } from '/src/components';

const Faq = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleOpen1 = () => {
    setOpen1(!open1);
  };
  const toggleOpen2 = () => {
    setOpen2(!open2);
  };

  return (
    <div className={styles.container}>
      <PageHeader title={'FAQs'} />
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.title}>
            <p>How do I download a book?</p>
          </div>
          <div className={styles.icon}>
            <img
              src='/up.svg'
              alt='up image'
              className={`${styles.img}  ${open ? styles.imgs : ''}`}
              onClick={() => toggleOpen()}
            />
          </div>
        </div>
        <div className={`${styles.bottom}  ${open ? styles.openDrawer : ''}`}>
          <p>
            First you need to be logged in, then navigate through a category and
            open a single book, inside you will find the download button.
          </p>
        </div>
        <div className={styles.top}>
          <div className={styles.title}>
            <p>What is the extension of the downloaded file?</p>
          </div>
          <div className={styles.icon}>
            <img
              src='/up.svg'
              alt='up image'
              className={`${styles.img}  ${open1 ? styles.imgs : ''}`}
              onClick={() => toggleOpen1()}
            />
          </div>
        </div>
        <div className={`${styles.bottom}  ${open1 ? styles.openDrawer : ''}`}>
          <p>
            All the files are in .PDF extesion to make it lighter and easier.
          </p>
        </div>
        <div className={styles.top}>
          <div className={styles.title}>
            <p>How many books can I download?</p>
          </div>
          <div className={styles.icon}>
            <img
              src='/up.svg'
              alt='up image'
              className={`${styles.img}  ${open2 ? styles.imgs : ''}`}
              onClick={() => toggleOpen2()}
            />
          </div>
        </div>
        <div className={`${styles.bottom}  ${open2 ? styles.openDrawer : ''}`}>
          <p>All registered users can download as many books as they want.</p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
