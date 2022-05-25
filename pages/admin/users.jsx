import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { requireAuthentication } from '../../utils/requireAuthentication';

const Users = () => {
  const { setUserItem, getUserItem } = useLocalStorage({});
  const [usersList, setUsersList] = useState();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/api/users', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setUsersList(data?.users));
  }, [usersList, setUsersList]);

  useEffect(() => {
    const loggedInUser = getUserItem({ key: 'user' });

    if (loggedInUser) {
      setUser(loggedInUser);
      setUserId(loggedInUser?.userId);
    }
  }, []);

  const deleteUser = (userId) => {
    const bodyData = {
      userId,
    };
    const data = JSON.stringify(bodyData);

    fetch(`/api/users/delete`, {
      method: 'DELETE',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(`User ${data?.delUsers?.firstName} deleted!`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.bottom}>
      <div className={styles.favList}>
        <div className={styles.header}>
          <h1>List of Users</h1>
          {usersList
            ?.filter(({ role }) => role?.includes('USER'))
            .map((filt) => (
              <div key={filt?.userId} className={styles.listWrapper}>
                <div className={styles.left}>
                  <div className={styles.top}>
                    <p>First Name: {filt?.firstName}</p>
                    <p>Last Name: {filt?.lastName}</p>
                  </div>
                  <div className={styles.bottom}>
                    <p>Email: {filt?.email}</p>
                    <p>Phone: {filt?.phoneNo}</p>
                  </div>
                </div>
                <div className={styles.right}>
                  <img
                    src='/bin.svg'
                    className={styles.icon}
                    alt='bin image'
                    onClick={() => deleteUser(filt?.userId)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Users;

export const getServerSideProps = requireAuthentication(async (context) => {
  return { props: {} };
});
