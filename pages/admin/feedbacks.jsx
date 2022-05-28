import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { useRouter } from 'next/router';
import { Spinner } from '/src/components';
import { useBreakpoint } from '../../hooks/useBreakPoint';

const Feedbacks = ({ feedbacks }) => {
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

  //   const deleteBook = (bookId) => {
  //     setR(true);
  //     const bodyData = {
  //       bookId,
  //     };
  //     const data = JSON.stringify(bodyData);

  //     fetch(`/api/books/delete`, {
  //       method: 'DELETE',
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data) {
  //           alert(`Book has been deleted!`);
  //           forceReload();
  //         }
  //         setR(false);
  //       })
  //       .catch((error) => console.error(error));
  //   };

  return (
    <div className={styles.bottom}>
      <div className={styles.favList}>
        {r && (
          <div className={styles.spin}>
            <Spinner />
          </div>
        )}
        <div className={styles.header}>
          <h1>Feedbacks</h1>
          {feedbacks?.map((filt) => (
            <div key={filt?.fbId} className={styles.listWrapper}>
              <div className={styles.left}>
                <div className={styles.top}>
                  <p>Name: {filt?.firstName}</p>
                  <p>Email: {filt?.email}</p>
                </div>
                <div className={styles.bottom}>
                  <p>User: {filt?.userId}</p>
                  <p>Message: {filt?.message}</p>
                </div>
              </div>
              <div className={styles.right}>
                <img
                  src='/bin.svg'
                  className={styles.icon}
                  alt='bin image'
                  onClick={() => console.log('kkk')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;

export const getServerSideProps = requireAuthentication(async (context) => {
  const feedbacks = await prisma.feedback.findMany();

  //   const allBooks = await all?.map((sus) => ({
  //     bookId: sus?.bookId,
  //     cover: sus?.cover,
  //     title: sus?.title,
  //     category: sus?.category,
  //     description: sus?.description,
  //     totalPages: sus?.totalPages,
  //     year: sus?.year,
  //   }));

  return { props: { feedbacks } };
});
