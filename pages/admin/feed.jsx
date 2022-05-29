import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const FeedbacksQuery = gql`
  query {
    feed {
      fbId
      email
      firstName
      message
    }
  }
`;

const Feed = () => {
  const { data, error, loading } = useQuery(FeedbacksQuery);
  const router = useRouter();
  const { getUserItem } = useLocalStorage({});
  const [feedbacks, setFeedbacks] = useState();

  if (loading) return <p>Loading....</p>;
  if (error) return console.log(JSON.stringify(error, null, 2));

  if (data) {
    console.log(data);
  }

  // useEffect(() => {
  //   const loggedInUser = getUserItem({ key: 'user' });

  //   if (loggedInUser.role !== 'ADMIN') {
  //     router.push('/Home');
  //   }
  // }, []);

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
          {data?.feed?.map((filt) => (
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
  // const feedbackss = await prisma.feed.findMany();

  // const feeds = await feedbackss?.map((feed) => ({
  //   fbId: feed.fbId,
  //   firstName: feed.firstName,
  //   email: feed.email,
  //   message: feed.message,
  // }));

  // const res = await apolloClient.query({ query: FeedbacksQuery });

  // console.log(res);
  return { props: {} };
});
