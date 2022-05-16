import { useState, useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { About, Login } from '/src/components';
import Profile from '../../src/components/ProfilePage';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ViewContext } from '../../pages/_app';

const ProfilePage = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { setItem, getItem } = useLocalStorage({});
  const router = useRouter();
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = getItem({ key: 'user' });
    const userToken = getItem({ key: 'token' });
    if (loggedInUser && userToken) {
      setUser(loggedInUser);
      setToken(userToken);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
