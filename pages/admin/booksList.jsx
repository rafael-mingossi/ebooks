import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { useRouter } from 'next/router';
import { Spinner } from '/src/components';
import { useBreakpoint } from '../../hooks/useBreakPoint';

const BooksList = ({ allBooks }) => {
  const router = useRouter();
  const { sm, lg } = useBreakpoint();
  const { getUserItem } = useLocalStorage({});
  const [r, setR] = useState(false);

  useEffect(() => {
    const loggedInUser = getUserItem({ key: 'user' });

    if (loggedInUser.role !== 'ADMIN') {
      router.push('/Home');
    }
  }, []);

  const forceReload = () => {
    router.reload();
  };

  const deleteBook = (bookId) => {
    setR(true);
    const bodyData = {
      bookId,
    };
    const data = JSON.stringify(bodyData);

    fetch(`/api/books/delete`, {
      method: 'DELETE',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(`Book has been deleted!`);
          forceReload();
        }
        setR(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.bottom}>
      <div className={styles.favList}>
        {r && (
          <div className={styles.spin}>
            <Spinner />
          </div>
        )}
        <div className={styles.header}>
          <h1>List of Books ( {allBooks?.length} in Total )</h1>
          {allBooks?.map((filt) => (
            <div key={filt?.bookId} className={styles.listWrapper}>
              <div className={styles.left}>
                <div className={styles.top}>
                  <p>
                    Title:{' '}
                    {sm
                      ? filt?.title.length > 30
                        ? filt?.title.substring(0, 28 - 3) + '...'
                        : filt?.title
                      : lg
                      ? filt?.title.length > 50
                        ? filt?.title.substring(0, 45 - 3) + '...'
                        : filt?.title
                      : filt?.title}
                  </p>
                  <p>Year: {filt?.year}</p>
                </div>
                <div className={styles.bottoms}>
                  <p>Category: {filt?.category}</p>
                  <p>Total Pages: {filt?.totalPages}</p>
                </div>
              </div>
              <div className={styles.right}>
                <img
                  src='/bin.svg'
                  className={styles.icon}
                  alt='bin image'
                  onClick={() => deleteBook(filt?.bookId)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksList;

export const getServerSideProps = requireAuthentication(async (context) => {
  const all = await prisma.book.findMany();

  const allBooks = await all?.map((sus) => ({
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  }));

  return { props: { allBooks } };
});
