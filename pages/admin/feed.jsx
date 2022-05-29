import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { useRouter } from 'next/router';

const Feed = ({ feeds }) => {
  const router = useRouter();
  const { getUserItem } = useLocalStorage({});
  const [feedbacks, setFeedbacks] = useState();

  useEffect(() => {
    const loggedInUser = getUserItem({ key: 'user' });

    if (loggedInUser.role !== 'ADMIN') {
      router.push('/Home');
    }
  }, []);

  // useEffect(async () => {
  //   await fetch('/api/feed', {
  //     method: 'GET',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         setFeedbacks(data?.feed);
  //         console.log(data?.feed);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div className={styles.bottom}>
      <div className={styles.favList}>
        <div className={styles.header}>
          <h1>Feedbacks</h1>
          {feeds?.map((filt) => (
            <div key={filt?.fbId} className={styles.listWrapperFeed}>
              <div className={styles.lefts}>
                <div className={styles.tops}>
                  <p>Name: {filt?.firstName}</p>
                  <p>Email: {filt?.email}</p>
                </div>
                <div className={styles.bottomFeed}>
                  <p>Message: {filt?.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;

export const getServerSideProps = requireAuthentication(async (context) => {
  const feedbackss = await prisma.feed.findMany();

  const feeds = await feedbackss?.map((feed) => ({
    fbId: feed.fbId,
    firstName: feed.firstName,
    email: feed.email,
    message: feed.message,
  }));

  //console.log(feeds);
  return { props: { feeds } };
});
