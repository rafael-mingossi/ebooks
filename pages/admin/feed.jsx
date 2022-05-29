import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apollo';

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

const Feed = ({ data }) => {
  //const { data, error, loading } = useQuery(FeedbacksQuery);
  const router = useRouter();
  const { getUserItem } = useLocalStorage({});
  const [feedbacks, setFeedbacks] = useState();

  // if (loading) return <p>Loading....</p>;
  // if (error) return console.log(JSON.stringify(error, null, 2));

  useEffect(() => {
    const loggedInUser = getUserItem({ key: 'user' });

    if (loggedInUser.role !== 'ADMIN') {
      router.push('/Home');
    }
  }, []);

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
  const { data } = await apolloClient.query({
    query: FeedbacksQuery,
  });

  //console.log('->>>', data);
  return { props: { data } };
});
